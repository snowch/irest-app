import { useCallback, useEffect, useState } from 'react'
import {
  clearBlobs,
  deleteBlob,
  getBlob,
  putBlob,
  requestPersistentStorage,
  storageEstimate,
} from '../lib/recordingsStore'
import {
  isAudioFile,
  metaFromFile,
  sortRecordings,
  type RecordingMeta,
} from '../lib/recordings'

// Meta lives in localStorage (small, instant to list); audio blobs live in
// IndexedDB (see recordingsStore). Keeping them separate means listing the
// library never has to load hundreds of megabytes of audio into memory.

const META_KEY = 'irest-recordings-meta-v1'

function loadMeta(): RecordingMeta[] {
  try {
    const raw = localStorage.getItem(META_KEY)
    return raw ? (JSON.parse(raw) as RecordingMeta[]) : []
  } catch {
    return []
  }
}

function saveMeta(list: RecordingMeta[]) {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

export interface ImportProgress {
  total: number
  done: number
  currentName: string
}

export function useRecordings() {
  const [recordings, setRecordings] = useState<RecordingMeta[]>(() =>
    sortRecordings(loadMeta()),
  )
  const [importing, setImporting] = useState<ImportProgress | null>(null)
  const [usage, setUsage] = useState<{ usage: number; quota: number }>({
    usage: 0,
    quota: 0,
  })

  const refreshUsage = useCallback(() => {
    void storageEstimate().then(setUsage)
  }, [])

  useEffect(() => {
    refreshUsage()
  }, [refreshUsage, recordings.length])

  const importFiles = useCallback(
    async (files: FileList | File[]) => {
      const audio = Array.from(files).filter(isAudioFile)
      if (audio.length === 0) {
        return { added: 0, skipped: Array.from(files).length }
      }
      await requestPersistentStorage()

      const byName = new Map(loadMeta().map((m) => [m.name, m]))
      let done = 0
      for (const file of audio) {
        setImporting({ total: audio.length, done, currentName: file.name })
        try {
          await putBlob(file.name, file)
          byName.set(file.name, metaFromFile(file))
        } catch {
          // Likely storage quota exceeded — stop importing further files.
          setImporting(null)
          const partial = sortRecordings([...byName.values()])
          saveMeta(partial)
          setRecordings(partial)
          throw new Error('storage-full')
        }
        done += 1
        setImporting({ total: audio.length, done, currentName: file.name })
      }

      const next = sortRecordings([...byName.values()])
      saveMeta(next)
      setRecordings(next)
      setImporting(null)
      refreshUsage()
      return { added: audio.length, skipped: Array.from(files).length - audio.length }
    },
    [refreshUsage],
  )

  const remove = useCallback(async (name: string) => {
    await deleteBlob(name)
    const next = loadMeta().filter((m) => m.name !== name)
    saveMeta(next)
    setRecordings(sortRecordings(next))
  }, [])

  const removeAll = useCallback(async () => {
    await clearBlobs()
    saveMeta([])
    setRecordings([])
    refreshUsage()
  }, [refreshUsage])

  /** Resolve a playable object URL for a recording. Caller must revoke it. */
  const getUrl = useCallback(async (name: string): Promise<string | null> => {
    const blob = await getBlob(name)
    return blob ? URL.createObjectURL(blob) : null
  }, [])

  return {
    recordings,
    importing,
    usage,
    importFiles,
    remove,
    removeAll,
    getUrl,
  }
}
