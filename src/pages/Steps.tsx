import { Link } from 'react-router-dom'
import { steps } from '../data/steps'

export default function Steps() {
  return (
    <div className="page">
      <Link to="/learn/the-ten-steps" className="back-link">← The Ten Steps</Link>
      <h1 className="page__title">The Ten Steps</h1>
      <p className="page__lead">
        Explore each step of the practice. They relate to one another by role,
        not just order — and each links to the recordings that work with it.
      </p>

      <ol className="principle-list">
        {steps.map((s) => (
          <li key={s.slug}>
            <Link className="principle-card" to={`/steps/${s.slug}`}>
              <span className="principle-card__num">{s.num}</span>
              <span className="principle-card__body">
                <span className="principle-card__title">{s.title}</span>
                <span className="principle-card__summary">{s.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
