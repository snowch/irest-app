import { Link } from 'react-router-dom'
import { modules, practices } from '../data/journey'
import { useProgress } from '../hooks/useProgress'

export default function Home() {
  const { progress, streak } = useProgress()
  const done = progress.completedModules.length
  const nextModule = modules.find((m) => !progress.completedModules.includes(m.slug))

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
        <Link className="cta-card" to={nextModule ? `/learn/${nextModule.slug}` : '/learn'}>
          <span className="cta-card__eyebrow">Continue learning</span>
          <span className="cta-card__title">
            {nextModule ? nextModule.title : 'Revisit the lessons'}
          </span>
          <span className="cta-card__hint">
            {nextModule ? `${nextModule.minutes} min read` : 'You have read them all'}
          </span>
        </Link>

        <Link className="cta-card cta-card--accent" to={`/practice/${practices[0].slug}`}>
          <span className="cta-card__eyebrow">Practice now</span>
          <span className="cta-card__title">{practices[0].title}</span>
          <span className="cta-card__hint">{practices[0].minutes} min · self-paced</span>
        </Link>
      </section>

      <p className="soft-note">
        Tip: install this app to your home screen for a distraction-free,
        offline-ready space to practice.
      </p>
    </div>
  )
}
