import { Link, useParams } from 'react-router-dom'
import { getPrinciple, principles } from '../data/principles'
import Figure from '../components/Figure'
import RelatedRecordings from '../components/RelatedRecordings'

export default function PrincipleDetail() {
  const { slug = '' } = useParams()
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
        <Figure src={principle.image} alt={principle.imageAlt} />
      )}

      <RelatedRecordings tracks={principle.relatedTracks} />

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
