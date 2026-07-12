import { Link } from 'react-router-dom'
import { practices } from '../data/journey'

export default function PracticeList() {
  return (
    <div className="page">
      <h1 className="page__title">Practice</h1>
      <p className="page__lead">
        Self-paced, text-guided sessions. Find a comfortable position, and let
        the guidance move at its own gentle pace.
      </p>

      <div className="practice-grid">
        {practices.map((p) => (
          <Link key={p.slug} className="practice-card" to={`/practice/${p.slug}`}>
            <span className="practice-card__level">{p.level}</span>
            <span className="practice-card__title">{p.title}</span>
            <span className="practice-card__subtitle">{p.subtitle}</span>
            <span className="practice-card__meta">
              {p.minutes} min · {p.stages.length} steps
            </span>
          </Link>
        ))}
      </div>

      <p className="soft-note">
        Recorded audio narration is coming in a future version. For now, each
        session is guided with written prompts and a gentle timer.
      </p>
    </div>
  )
}
