import { Link, useNavigate, useParams } from 'react-router-dom'
import { catalogTitle, getPrinciple, principles } from '../data/principles'
import { useRecordings } from '../hooks/useRecordings'

export default function PrincipleDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { recordings } = useRecordings()
  const principle = getPrinciple(slug)

  if (!principle) {
    return (
      <div className="page">
        <p>That principle could not be found.</p>
        <Link to="/principles" className="btn btn--ghost">Back to principles</Link>
      </div>
    )
  }

  const index = principles.findIndex((p) => p.slug === slug)
  const next = principles[index + 1]

  // Map each related track number to the user's imported file (if any).
  const related = principle.relatedTracks.map((num) => {
    const imported = recordings.find((r) => r.num === num)
    return {
      num,
      title: imported?.title ?? catalogTitle(num),
      available: Boolean(imported),
      name: imported?.name,
    }
  })

  return (
    <article className="page page--reading">
      <Link to="/principles" className="back-link">← Core Principles</Link>
      <h1 className="page__title">{principle.title}</h1>

      <div className="prose">
        {principle.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <h2 className="section-title">Related recordings</h2>
      <ul className="rec-links">
        {related.map((r) => (
          <li key={r.num}>
            {r.available ? (
              <button
                className="rec-link rec-link--available"
                onClick={() => navigate(`/recordings?play=${r.num}`)}
              >
                <span className="rec-link__icon" aria-hidden="true">▶</span>
                <span className="rec-link__title">
                  {String(r.num).padStart(2, '0')} · {r.title}
                </span>
              </button>
            ) : (
              <div className="rec-link rec-link--missing">
                <span className="rec-link__icon" aria-hidden="true">♫</span>
                <span className="rec-link__title">
                  {String(r.num).padStart(2, '0')} · {r.title}
                </span>
                <Link to="/recordings" className="rec-link__add">Add</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="soft-note" style={{ textAlign: 'left' }}>
        Recordings play in the Audio tab. They are yours, stored privately on
        this device — this app includes no audio of its own.
      </p>

      <div className="reading__actions">
        {next ? (
          <Link className="btn btn--ghost" to={`/principles/${next.slug}`}>
            Next principle →
          </Link>
        ) : (
          <Link className="btn btn--ghost" to="/principles">
            Back to all principles
          </Link>
        )}
      </div>
    </article>
  )
}
