import { useState } from 'react'
import { Link } from 'react-router-dom'
import { foundations } from '../data/foundations'
import { useFoundations } from '../hooks/useFoundations'

export default function Prepare() {
  const { foundations: values, setField, isSet, allComplete } = useFoundations()

  return (
    <div className="page">
      <h1 className="page__title">Prepare</h1>
      <p className="page__lead">
        Before you practise iRest, establish three personal foundations. You set
        them once, in your own words, and bring them to every session. They stay
        private on this device.
      </p>

      {allComplete ? (
        <div className="prepare-status prepare-status--done">
          ✓ Your foundations are set. You’re ready to{' '}
          <Link to="/practice">practise</Link>.
        </div>
      ) : (
        <div className="prepare-status">
          Complete all three to unlock Practice.
        </div>
      )}

      <div className="foundation-list">
        {foundations.map((f) => (
          <FoundationCard
            key={f.key}
            title={f.title}
            short={f.short}
            description={f.description}
            placeholder={f.placeholder}
            aiPrompt={f.aiPrompt}
            value={values[f.key]}
            done={isSet(f.key)}
            onChange={(v) => setField(f.key, v)}
          />
        ))}
      </div>
    </div>
  )
}

function FoundationCard(props: {
  title: string
  short: string
  description: string[]
  placeholder: string
  aiPrompt: string
  value: string
  done: boolean
  onChange: (v: string) => void
}) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(props.aiPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="foundation">
      <div className="foundation__head">
        <h2 className="foundation__title">{props.title}</h2>
        <span className={'foundation__badge' + (props.done ? ' foundation__badge--done' : '')}>
          {props.done ? '✓ Set' : 'Not set'}
        </span>
      </div>
      <div className="prose prose--tight">
        {props.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <button className="ai-toggle" onClick={() => setShowPrompt((s) => !s)}>
        {showPrompt ? '▾ ' : '▸ '}Help me write this with AI
      </button>
      {showPrompt && (
        <div className="ai-prompt">
          <p className="ai-prompt__hint">
            Copy this into ChatGPT, Claude, or another assistant, answer its
            questions, then paste your result below.
          </p>
          <blockquote className="ai-prompt__text">{props.aiPrompt}</blockquote>
          <button className="btn btn--ghost btn--small" onClick={copyPrompt}>
            {copied ? '✓ Copied' : 'Copy prompt'}
          </button>
        </div>
      )}

      <label className="foundation__label" htmlFor={`f-${props.title}`}>
        Your {props.title.toLowerCase()}
      </label>
      <textarea
        id={`f-${props.title}`}
        className="foundation__input"
        value={props.value}
        placeholder={props.placeholder}
        rows={3}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </section>
  )
}
