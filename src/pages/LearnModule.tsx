import { Link, useNavigate, useParams } from 'react-router-dom'
import { getModule, modules } from '../data/journey'
import { useProgress } from '../hooks/useProgress'

export default function LearnModule() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { isModuleComplete, toggleModule } = useProgress()
  const mod = getModule(slug)

  if (!mod) {
    return (
      <div className="page">
        <p>That lesson could not be found.</p>
        <Link to="/learn" className="btn btn--ghost">Back to lessons</Link>
      </div>
    )
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const next = modules[index + 1]
  const complete = isModuleComplete(slug)

  return (
    <article className="page page--reading">
      <Link to="/learn" className="back-link">← Lessons</Link>
      <h1 className="page__title">{mod.title}</h1>
      <p className="reading__meta">{mod.minutes} min read</p>

      <div className="prose">
        {mod.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {mod.reflection && (
          <blockquote className="reflection">
            <span className="reflection__label">Reflect</span>
            {mod.reflection}
          </blockquote>
        )}
      </div>

      {mod.cta && (
        <Link className="btn btn--big" to={mod.cta.to}>
          {mod.cta.label} →
        </Link>
      )}

      <div className="reading__actions">
        <button
          className={'btn' + (complete ? ' btn--done' : '')}
          onClick={() => toggleModule(slug)}
        >
          {complete ? '✓ Marked as read' : 'Mark as read'}
        </button>
        {next ? (
          <button
            className="btn btn--ghost"
            onClick={() => {
              if (!complete) toggleModule(slug)
              navigate(`/learn/${next.slug}`)
            }}
          >
            Next lesson →
          </button>
        ) : (
          <Link className="btn btn--ghost" to="/practice">
            Start practicing →
          </Link>
        )}
      </div>
    </article>
  )
}
