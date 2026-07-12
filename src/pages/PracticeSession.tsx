import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPractice } from '../data/journey'
import { catalogTitle } from '../data/principles'
import { useProgress } from '../hooks/useProgress'
import { useRecordings } from '../hooks/useRecordings'
import { playChime } from '../lib/chime'

type Phase = 'intro' | 'playing' | 'done'

export default function PracticeSession() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const practice = getPractice(slug)
  const { recordSession } = useProgress()
  const { recordings } = useRecordings()

  const [phase, setPhase] = useState<Phase>('intro')
  const [stageIndex, setStageIndex] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [paused, setPaused] = useState(false)
  const [chime, setChime] = useState(false)
  const recordedRef = useRef(false)

  const stage = practice?.stages[stageIndex]

  // Countdown timer for the current stage.
  useEffect(() => {
    if (phase !== 'playing' || paused || !stage) return
    if (remaining <= 0) return
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase, paused, stage, remaining])

  // Advance when the current stage's time runs out.
  useEffect(() => {
    if (phase !== 'playing' || !stage) return
    if (remaining > 0) return
    // remaining hit zero: move on
    const t = window.setTimeout(() => advance(), 600)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, phase])

  // Record a completed session exactly once.
  useEffect(() => {
    if (phase === 'done' && practice && !recordedRef.current) {
      recordedRef.current = true
      recordSession(practice.slug)
    }
  }, [phase, practice, recordSession])

  if (!practice || !stage) {
    return (
      <div className="page">
        <p>That practice could not be found.</p>
        <Link to="/practice" className="btn btn--ghost">Back to practices</Link>
      </div>
    )
  }

  function startStage(i: number) {
    const s = practice!.stages[i]
    setStageIndex(i)
    setRemaining(s.seconds)
    if (chime) playChime()
  }

  function begin() {
    recordedRef.current = false
    setPhase('playing')
    startStage(0)
  }

  function advance() {
    if (stageIndex + 1 < practice!.stages.length) {
      startStage(stageIndex + 1)
    } else {
      if (chime) playChime()
      setPhase('done')
    }
  }

  function back() {
    if (stageIndex > 0) startStage(stageIndex - 1)
  }

  // -- Intro screen -------------------------------------------------------
  if (phase === 'intro') {
    return (
      <div className="page page--session-intro">
        <Link to="/practice" className="back-link">← Practices</Link>
        <span className="practice-card__level">{practice.level}</span>
        <h1 className="page__title">{practice.title}</h1>
        <p className="page__lead">{practice.intro}</p>

        <ul className="stage-preview">
          {practice.stages.map((s) => (
            <li key={s.key}>
              <span className="stage-preview__dot" aria-hidden="true" />
              {s.title}
            </li>
          ))}
        </ul>

        <label className="toggle">
          <input
            type="checkbox"
            checked={chime}
            onChange={(e) => setChime(e.target.checked)}
          />
          <span>Play a soft chime between steps</span>
        </label>

        <button className="btn btn--big" onClick={begin}>
          Begin · {practice.minutes} min
        </button>

        {practice.recordingTrack != null && (() => {
          const track = practice.recordingTrack!
          const imported = recordings.find((r) => r.num === track)
          const title = imported?.title ?? catalogTitle(track)
          return (
            <div className="audio-option">
              <div className="audio-option__divider"><span>or</span></div>
              {imported ? (
                <button
                  className="btn btn--ghost btn--big"
                  onClick={() => navigate(`/recordings?play=${track}`)}
                >
                  ▶ Play the recording
                </button>
              ) : (
                <p className="audio-option__hint">
                  Own the “{title}” recording? Add it in the{' '}
                  <Link to="/recordings">Audio</Link> tab to listen instead.
                </p>
              )}
            </div>
          )
        })()}
      </div>
    )
  }

  // -- Done screen --------------------------------------------------------
  if (phase === 'done') {
    return (
      <div className="page page--session-done">
        <div className="done-mark" aria-hidden="true">✓</div>
        <h1 className="page__title">Rest complete</h1>
        <p className="page__lead">
          Take a moment before moving on. Notice how you feel. Your session has
          been added to your progress.
        </p>
        <div className="reading__actions">
          <button className="btn" onClick={begin}>
            Practice again
          </button>
          <Link className="btn btn--ghost" to="/practice">
            Back to practices
          </Link>
        </div>
      </div>
    )
  }

  // -- Playing screen -----------------------------------------------------
  const total = stage.seconds || 1
  const pct = ((total - remaining) / total) * 100
  const mm = Math.floor(remaining / 60)
  const ss = String(remaining % 60).padStart(2, '0')

  return (
    <div className="page page--player">
      <div className="player__top">
        <Link to="/practice" className="back-link">← Exit</Link>
        <span className="player__count">
          Step {stageIndex + 1} of {practice.stages.length}
        </span>
      </div>

      <div className="stepper" aria-hidden="true">
        {practice.stages.map((s, i) => (
          <span
            key={s.key}
            className={
              'stepper__seg' +
              (i < stageIndex ? ' stepper__seg--past' : '') +
              (i === stageIndex ? ' stepper__seg--current' : '')
            }
          />
        ))}
      </div>

      <div className="player__stage">
        <div className="progress-ring" style={{ ['--pct' as string]: `${pct}%` }}>
          <span className="progress-ring__time">
            {mm}:{ss}
          </span>
        </div>

        <h2 className="player__title">{stage.title}</h2>
        <div className="player__guidance">
          {stage.guidance.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      <div className="player__controls">
        <button className="ctrl" onClick={back} disabled={stageIndex === 0} aria-label="Previous step">
          ⏮
        </button>
        <button
          className="ctrl ctrl--primary"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume' : 'Pause'}
        >
          {paused ? '▶' : '❚❚'}
        </button>
        <button className="ctrl" onClick={advance} aria-label="Next step">
          ⏭
        </button>
      </div>
    </div>
  )
}
