import { modules } from '../data/journey'
import { useProgress, type SessionRecord } from '../hooks/useProgress'

function sessionTitle(s: SessionRecord): string {
  // Prefer the title captured at completion; fall back to a cleaned id.
  return s.title ?? s.practiceSlug.replace(/^rec:/, '').replace(/\.[^.]+$/, '')
}

export default function ProgressPage() {
  const { progress, streak, reset } = useProgress()
  const recent = [...progress.sessions].sort((a, b) => b.completedAt - a.completedAt).slice(0, 8)

  return (
    <div className="page">
      <h1 className="page__title">Your Progress</h1>

      <section className="stat-row" aria-label="Summary">
        <div className="stat">
          <span className="stat__num">{progress.completedModules.length}/{modules.length}</span>
          <span className="stat__label">Lessons</span>
        </div>
        <div className="stat">
          <span className="stat__num">{progress.sessions.length}</span>
          <span className="stat__label">Sessions</span>
        </div>
        <div className="stat">
          <span className="stat__num">{streak}</span>
          <span className="stat__label">Day streak</span>
        </div>
      </section>

      <h2 className="section-title">Recent sessions</h2>
      {recent.length === 0 ? (
        <p className="empty">
          No sessions yet. When you complete a practice, it will appear here.
        </p>
      ) : (
        <ul className="history">
          {recent.map((s) => (
            <li key={s.completedAt} className="history__item">
              <span className="history__title">{sessionTitle(s)}</span>
              <span className="history__date">
                {new Date(s.completedAt).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h2 className="section-title">Lessons read</h2>
      <ul className="chip-list">
        {modules.map((m) => (
          <li
            key={m.slug}
            className={
              'chip' +
              (progress.completedModules.includes(m.slug) ? ' chip--done' : '')
            }
          >
            {progress.completedModules.includes(m.slug) ? '✓ ' : ''}
            {m.title}
          </li>
        ))}
      </ul>

      <button
        className="btn btn--ghost btn--danger"
        onClick={() => {
          if (confirm('Reset all progress on this device? This cannot be undone.')) {
            reset()
          }
        }}
      >
        Reset progress
      </button>
      <p className="soft-note">
        Your progress is stored only in this browser on this device.
      </p>
    </div>
  )
}
