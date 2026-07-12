import { Link } from 'react-router-dom'
import { modules } from '../data/journey'
import { useProgress } from '../hooks/useProgress'

export default function Learn() {
  const { isModuleComplete } = useProgress()

  return (
    <div className="page">
      <h1 className="page__title">Learn</h1>
      <p className="page__lead">
        Six short lessons introduce the ideas behind iRest. Read them in order,
        or dip into whatever calls to you.
      </p>

      <ol className="lesson-list">
        {modules.map((m, i) => {
          const complete = isModuleComplete(m.slug)
          return (
            <li key={m.slug}>
              <Link className="lesson" to={`/learn/${m.slug}`}>
                <span className={'lesson__step' + (complete ? ' lesson__step--done' : '')}>
                  {complete ? '✓' : i + 1}
                </span>
                <span className="lesson__text">
                  <span className="lesson__title">{m.title}</span>
                  <span className="lesson__summary">{m.summary}</span>
                  <span className="lesson__meta">{m.minutes} min read</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
