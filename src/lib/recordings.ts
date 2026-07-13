// Filename parsing and metadata for imported recordings.
//
// The purchased set ships as files named like "05 Affirming Your Intentions.mp3".
// We auto-discover the library from whatever the user imports: derive an order
// and a clean title from each filename, and filter out non-audio files (e.g. a
// tracker spreadsheet that lives in the same folder).

export interface RecordingMeta {
  /** Original filename — the stable key used in IndexedDB. */
  name: string
  /** Leading track number if present (e.g. 5), else null. */
  num: number | null
  /** Human title derived from the filename. */
  title: string
  size: number
  type: string
  addedAt: number
  /** Length in seconds, read from the audio metadata (may be absent). */
  duration?: number
}

const AUDIO_EXT = new Set([
  'mp3',
  'm4a',
  'aac',
  'wav',
  'ogg',
  'oga',
  'opus',
  'flac',
  'weba',
])

export function isAudioFile(file: { name: string; type?: string }): boolean {
  if (file.type && file.type.startsWith('audio/')) return true
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  return AUDIO_EXT.has(ext)
}

/** Turn "05 Affirming Your Intentions.mp3" into { num: 5, title: "Affirming Your Intentions" }. */
export function parseFilename(name: string): { num: number | null; title: string } {
  const withoutExt = name.replace(/\.[^.]+$/, '')
  const m = withoutExt.match(/^\s*(\d+)\s+(.*)$/)
  if (m) {
    const num = parseInt(m[1], 10)
    const title = m[2].replace(/\s+/g, ' ').trim()
    return { num: Number.isNaN(num) ? null : num, title: title || withoutExt.trim() }
  }
  return { num: null, title: withoutExt.replace(/\s+/g, ' ').trim() }
}

export function metaFromFile(file: File): RecordingMeta {
  const { num, title } = parseFilename(file.name)
  return {
    name: file.name,
    num,
    title,
    size: file.size,
    type: file.type || 'audio/mpeg',
    addedAt: Date.now(),
  }
}

/** Order by track number (unnumbered last), then by filename. */
export function sortRecordings(list: RecordingMeta[]): RecordingMeta[] {
  return [...list].sort((a, b) => {
    if (a.num == null && b.num == null) return a.name.localeCompare(b.name)
    if (a.num == null) return 1
    if (b.num == null) return -1
    if (a.num !== b.num) return a.num - b.num
    return a.name.localeCompare(b.name)
  })
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Compact length for lists/links, e.g. "18 min". Null if unknown. */
export function formatLength(seconds?: number): string | null {
  if (!seconds || !Number.isFinite(seconds) || seconds <= 0) return null
  if (seconds < 60) return '<1 min'
  return `${Math.round(seconds / 60)} min`
}

/** Read an audio file's duration (seconds) from its metadata. Resolves 0 on failure. */
export function readAudioDuration(blob: Blob): Promise<number> {
  return new Promise((resolve) => {
    let settled = false
    const url = URL.createObjectURL(blob)
    const audio = document.createElement('audio')
    audio.preload = 'metadata'
    const finish = () => {
      if (settled) return
      settled = true
      const d = Number.isFinite(audio.duration) ? audio.duration : 0
      URL.revokeObjectURL(url)
      audio.removeAttribute('src')
      resolve(d)
    }
    audio.onloadedmetadata = finish
    audio.onerror = finish
    window.setTimeout(finish, 8000)
    audio.src = url
  })
}
