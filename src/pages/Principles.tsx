import { Link } from 'react-router-dom'
import { principles } from '../data/principles'

export default function Principles() {
  return (
    <div className="page">
      <Link to="/learn/core-principles" className="back-link">← Core Principles</Link>
      <h1 className="page__title">The Core Principles</h1>
      <p className="page__lead">
        Seven foundational ideas that shape iRest. Explore each one, and — if you
        own the recordings — listen to the meditations that bring it to life.
      </p>

      <ol className="principle-list">
        {principles.map((p, i) => (
          <li key={p.slug}>
            <Link className="principle-card" to={`/principles/${p.slug}`}>
              <span className="principle-card__num">{i + 1}</span>
              <span className="principle-card__body">
                <span className="principle-card__title">{p.title}</span>
                <span className="principle-card__summary">{p.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
