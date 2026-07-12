import { useCallback, useEffect, useState } from 'react'
import type { FoundationKey } from '../data/foundations'

// The user's personal foundations, stored privately in the browser. Same
// live-sync approach as useProgress so the Practice gate and Home status
// update the moment a foundation is saved.

const STORAGE_KEY = 'irest-foundations-v1'
const CHANGE_EVENT = 'irest-foundations-change'

export type Foundations = Record<FoundationKey, string>

const empty: Foundations = { mission: '', intention: '', innerResource: '' }

function load(): Foundations {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<Foundations>
    return {
      mission: parsed.mission ?? '',
      intention: parsed.intention ?? '',
      innerResource: parsed.innerResource ?? '',
    }
  } catch {
    return empty
  }
}

function save(f: Foundations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(f))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  } catch {
    /* ignore */
  }
}

export function useFoundations() {
  const [foundations, setFoundations] = useState<Foundations>(load)

  useEffect(() => {
    const resync = () => setFoundations(load())
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) resync()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener(CHANGE_EVENT, resync)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(CHANGE_EVENT, resync)
    }
  }, [])

  const setField = useCallback((key: FoundationKey, value: string) => {
    setFoundations((prev) => {
      const next = { ...prev, [key]: value }
      save(next)
      return next
    })
  }, [])

  const isSet = (key: FoundationKey) => foundations[key].trim().length > 0
  const completeCount = (Object.keys(foundations) as FoundationKey[]).filter(
    (k) => foundations[k].trim().length > 0,
  ).length
  const allComplete = completeCount === 3

  return { foundations, setField, isSet, completeCount, allComplete }
}
