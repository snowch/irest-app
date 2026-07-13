import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { catalogTitle, getPrinciple, principles } from '../data/principles'
import { useRecordings } from '../hooks/useRecordings'

export default function PrincipleDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { recordings } = useRecordings()
  const [zoomed, setZoomed] = useState(false)
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

      {principle.image && (
        <figure className="principle-figure">
          <button
            type="button"
            className="principle-figure__btn"
            onClick={() => setZoomed(true)}
            aria-label="Enlarge diagram"
          >
            <img
              src={`${import.meta.env.BASE_URL}${principle.image}`}
              alt={principle.imageAlt ?? ''}
              loading="lazy"
            />
          </button>
          <figcaption>Tap the diagram to enlarge</figcaption>
        </figure>
      )}

      {zoomed && principle.image && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={principle.imageAlt ?? 'Diagram'}
          onClick={() => setZoomed(false)}
        >
          <button className="lightbox__close" aria-label="Close">✕</button>
          <img
            src={`${import.meta.env.BASE_URL}${principle.image}`}
            alt={principle.imageAlt ?? ''}
          />
        </div>
      )}

      <h2 className="section-title">Related recordings</h2>
      <ul className="rec-links">
        {related.map((r) => (
          <li key={r.num}>
            {r.available ? (
              <button
                className="rec-link rec-link--available"
                onClick={() => navigate(`/practice?play=${r.num}`)}
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
                <Link to="/practice" className="rec-link__add">Add</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="soft-note" style={{ textAlign: 'left' }}>
        Recordings play in the Practice tab. They are yours, stored privately on
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
