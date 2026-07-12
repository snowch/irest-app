import { Link } from 'react-router-dom'
import { modules } from '../data/journey'
import { useProgress } from '../hooks/useProgress'
import { useFoundations } from '../hooks/useFoundations'
import { useRecordings } from '../hooks/useRecordings'

export default function Home() {
  const { progress, streak } = useProgress()
  const { allComplete, completeCount } = useFoundations()
  const { recordings } = useRecordings()

  const done = progress.completedModules.length
  const nextModule = modules.find((m) => !progress.completedModules.includes(m.slug))
  const hasRecordings = recordings.length > 0
  const readyToPractice = allComplete && hasRecordings

  return (
    <div className="page page--home">
      <header className="hero">
        <div className="hero__mark" aria-hidden="true">
          <span className="ripple" />
          <span className="ripple ripple--2" />
          <span className="ripple ripple--3" />
        </div>
        <h1>iRest Journey</h1>
        <p className="hero__tagline">
          Learn and practice Integrative Restoration — a gentle meditation
          rooted in Yoga Nidra — one restful step at a time.
        </p>
      </header>

      <section className="stat-row" aria-label="Your progress">
        <div className="stat">
          <span className="stat__num">{done}/{modules.length}</span>
          <span className="stat__label">Lessons read</span>
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

      <section className="card-stack">
        {!readyToPractice && (
          <Link className="cta-card cta-card--accent" to={allComplete ? '/practice' : '/prepare'}>
            <span className="cta-card__eyebrow">Get started</span>
            <span className="cta-card__title">
              {allComplete ? 'Add your recordings' : 'Set your foundations'}
            </span>
            <span className="cta-card__hint">
              {allComplete
                ? 'Import your recordings to begin practising'
                : `Heartfelt Mission, Intention & Inner Resource · ${completeCount}/3 done`}
            </span>
          </Link>
        )}

        {readyToPractice && (
          <Link className="cta-card cta-card--accent" to="/practice">
            <span className="cta-card__eyebrow">Practice now</span>
            <span className="cta-card__title">Your recordings</span>
            <span className="cta-card__hint">{recordings.length} sessions ready</span>
          </Link>
        )}

        <Link className="cta-card" to={nextModule ? `/learn/${nextModule.slug}` : '/learn'}>
          <span className="cta-card__eyebrow">Continue learning</span>
          <span className="cta-card__title">
            {nextModule ? nextModule.title : 'Revisit the lessons'}
          </span>
          <span className="cta-card__hint">
            {nextModule ? `${nextModule.minutes} min read` : 'You have read them all'}
          </span>
        </Link>
      </section>

      <p className="soft-note">
        Tip: install this app to your home screen for a distraction-free,
        offline-ready space to practice.
      </p>
    </div>
  )
}
