import { useCallback, useEffect, useState } from 'react'

// Local-only progress. No account, no backend — everything lives in the
// browser via localStorage, which is all a static GitHub Pages app needs.

const STORAGE_KEY = 'irest-progress-v1'

export interface SessionRecord {
  practiceSlug: string
  /** ISO date string (yyyy-mm-dd) the session was completed. */
  date: string
  completedAt: number
}

export interface Progress {
  completedModules: string[]
  sessions: SessionRecord[]
}

const empty: Progress = { completedModules: [], sessions: [] }

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      completedModules: parsed.completedModules ?? [],
      sessions: parsed.sessions ?? [],
    }
  } catch {
    return empty
  }
}

function save(p: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    // storage full or unavailable — fail quietly
  }
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Count of consecutive days (ending today or yesterday) with a session. */
function computeStreak(sessions: SessionRecord[]): number {
  if (sessions.length === 0) return 0
  const days = new Set(sessions.map((s) => s.date))
  let streak = 0
  const cursor = new Date()
  // Allow the streak to still count if the most recent session was yesterday.
  if (!days.has(todayIso())) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(cursor.toISOString().slice(0, 10))) return 0
  }
  for (;;) {
    const iso = cursor.toISOString().slice(0, 10)
    if (days.has(iso)) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setProgress(load())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const persist = useCallback((next: Progress) => {
    setProgress(next)
    save(next)
  }, [])

  const toggleModule = useCallback(
    (slug: string) => {
      setProgress((prev) => {
        const has = prev.completedModules.includes(slug)
        const completedModules = has
          ? prev.completedModules.filter((s) => s !== slug)
          : [...prev.completedModules, slug]
        const next = { ...prev, completedModules }
        save(next)
        return next
      })
    },
    [],
  )

  const recordSession = useCallback((practiceSlug: string) => {
    setProgress((prev) => {
      const next: Progress = {
        ...prev,
        sessions: [
          ...prev.sessions,
          {
            practiceSlug,
            date: todayIso(),
            completedAt: Date.now(),
          },
        ],
      }
      save(next)
      return next
    })
  }, [])

  const reset = useCallback(() => persist(empty), [persist])

  return {
    progress,
    streak: computeStreak(progress.sessions),
    isModuleComplete: (slug: string) => progress.completedModules.includes(slug),
    toggleModule,
    recordSession,
    reset,
  }
}
