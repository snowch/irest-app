import { Link, useParams } from 'react-router-dom'
import { getStep, steps } from '../data/steps'
import RelatedRecordings from '../components/RelatedRecordings'

export default function StepDetail() {
  const { slug = '' } = useParams()
  const step = getStep(slug)

  if (!step) {
    return (
      <div className="page">
        <p>That step could not be found.</p>
        <Link to="/steps" className="btn btn--ghost">Back to the ten steps</Link>
      </div>
    )
  }

  const index = steps.findIndex((s) => s.slug === slug)
  const next = steps[index + 1]

  return (
    <article className="page page--reading">
      <Link to="/steps" className="back-link">← The Ten Steps</Link>
      <span className="step-eyebrow">Step {step.num} of 10</span>
      <h1 className="page__title">{step.title}</h1>
      <p className="step-role">{step.role}</p>
      {step.kosha && <p className="step-kosha">{step.kosha}</p>}

      <div className="prose">
        {step.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <RelatedRecordings tracks={step.relatedTracks} />

      <div className="reading__actions">
        {next ? (
          <Link className="btn" to={`/steps/${next.slug}`}>
            Next step →
          </Link>
        ) : (
          <Link className="btn btn--ghost" to="/steps">
            Back to all steps
          </Link>
        )}
      </div>
    </article>
  )
}
