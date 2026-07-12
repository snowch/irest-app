// Persistent storage for imported recordings.
//
// Audio blobs are cached in IndexedDB so the user imports their purchased
// files once and they survive app restarts and work offline — important for
// an installed PWA used on a phone, where re-picking 42 files each launch
// would be unworkable. Nothing ever leaves the device: no upload, no server,
// no sharing. The app never ships or redistributes the purchased audio.

const DB_NAME = 'irest-recordings'
const DB_VERSION = 1
const STORE = 'blobs'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'name' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function tx<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode)
        const req = fn(t.objectStore(STORE))
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
        t.oncomplete = () => db.close()
      }),
  )
}

export function putBlob(name: string, blob: Blob): Promise<void> {
  return tx('readwrite', (s) => s.put({ name, blob })).then(() => undefined)
}

export async function getBlob(name: string): Promise<Blob | undefined> {
  const rec = await tx<{ name: string; blob: Blob } | undefined>(
    'readonly',
    (s) => s.get(name),
  )
  return rec?.blob
}

export function deleteBlob(name: string): Promise<void> {
  return tx('readwrite', (s) => s.delete(name)).then(() => undefined)
}

export function clearBlobs(): Promise<void> {
  return tx('readwrite', (s) => s.clear()).then(() => undefined)
}

/** Ask the browser to keep our data from being evicted under storage pressure. */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (navigator.storage?.persist) {
      if (await navigator.storage.persisted()) return true
      return await navigator.storage.persist()
    }
  } catch {
    /* not supported */
  }
  return false
}

export async function storageEstimate(): Promise<{ usage: number; quota: number }> {
  try {
    const est = await navigator.storage?.estimate?.()
    return { usage: est?.usage ?? 0, quota: est?.quota ?? 0 }
  } catch {
    return { usage: 0, quota: 0 }
  }
}
