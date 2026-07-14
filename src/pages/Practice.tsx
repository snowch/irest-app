import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useRecordings } from '../hooks/useRecordings'
import { useFoundations } from '../hooks/useFoundations'
import { useProgress } from '../hooks/useProgress'
import { formatBytes, formatLength, formatTime } from '../lib/recordings'

export default function Practice() {
  const { recordings, importing, usage, importFiles, removeAll, getUrl } =
    useRecordings()
  const { allComplete, completeCount } = useFoundations()
  const { recordSession } = useProgress()

  const folderInputRef = useRef<HTMLInputElement>(null)
  const filesInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const urlRef = useRef<string | null>(null)

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [autoplayNext, setAutoplayNext] = useState<boolean>(() => {
    try {
      return localStorage.getItem('irest-autoplay-next') === '1'
    } catch {
      return false
    }
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const autoPlayedRef = useRef(false)

  useEffect(() => {
    try {
      localStorage.setItem('irest-autoplay-next', autoplayNext ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [autoplayNext])

  useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute('webkitdirectory', '')
      folderInputRef.current.setAttribute('directory', '')
    }
  }, [])

  const current = currentIndex != null ? recordings[currentIndex] : null
  const ready = allComplete && recordings.length > 0

  const loadTrack = useCallback(
    async (index: number) => {
      const rec = recordings[index]
      if (!rec) return
      const url = await getUrl(rec.name)
      if (!url) {
        setError('That recording could not be loaded. Try re-importing.')
        return
      }
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
      urlRef.current = url
      setCurrentIndex(index)
      const audio = audioRef.current
      if (audio) {
        audio.src = url
        audio.play().then(
          () => setIsPlaying(true),
          () => setIsPlaying(false),
        )
      }
    },
    [recordings, getUrl],
  )

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  // Auto-play a track requested via ?play=<trackNumber> (from a principle page).
  useEffect(() => {
    const play = searchParams.get('play')
    if (!play || autoPlayedRef.current || !ready) return
    const idx = recordings.findIndex((r) => String(r.num) === play || r.name === play)
    if (idx >= 0) {
      autoPlayedRef.current = true
      void loadTrack(idx)
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, recordings, ready, loadTrack, setSearchParams])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || currentIndex == null) return
    if (audio.paused) {
      audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      )
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const skip = (delta: number) => {
    const audio = audioRef.current
    if (audio) audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta))
  }

  const step = (delta: number) => {
    if (currentIndex == null) return
    const next = currentIndex + delta
    if (next >= 0 && next < recordings.length) void loadTrack(next)
  }

  function onEnded() {
    // Log the finished recording as a completed session.
    if (current) recordSession(`rec:${current.name}`, current.title)
    // Only roll into the next track if the user opted into continuous play.
    if (autoplayNext) step(1)
    else setIsPlaying(false)
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const files = e.target.files
    if (!files || files.length === 0) return
    try {
      const res = await importFiles(files)
      if (res.added === 0) setError('No audio files were found in that selection.')
    } catch {
      setError(
        'Storage filled up before all files were imported. The recordings added so far are saved; you can remove some or free space and try again.',
      )
    } finally {
      e.target.value = ''
    }
  }

  // ---- Setup gate: foundations + recordings required --------------------
  if (!ready && !importing) {
    return (
      <div className="page">
        <h1 className="page__title">Practice</h1>
        <p className="page__lead">
          iRest is practised with recorded guidance. Two quick steps unlock your
          practice — you only do them once.
        </p>

        <ol className="setup-steps">
          <li className={'setup-step' + (allComplete ? ' setup-step--done' : '')}>
            <span className="setup-step__check">{allComplete ? '✓' : '1'}</span>
            <span className="setup-step__body">
              <span className="setup-step__title">Set your foundations</span>
              <span className="setup-step__desc">
                {allComplete
                  ? 'Your Heartfelt Mission, Intention, and Inner Resource are set.'
                  : `Establish your Heartfelt Mission, Intention, and Inner Resource (${completeCount}/3 done).`}
              </span>
              {!allComplete && (
                <Link to="/prepare" className="btn btn--small">Go to Prepare →</Link>
              )}
            </span>
          </li>

          <li className={'setup-step' + (recordings.length > 0 ? ' setup-step--done' : '')}>
            <span className="setup-step__check">{recordings.length > 0 ? '✓' : '2'}</span>
            <span className="setup-step__body">
              <span className="setup-step__title">Add your recordings</span>
              <span className="setup-step__desc">
                {recordings.length > 0
                  ? `${recordings.length} recordings on this device.`
                  : 'Import your own set of recorded iRest meditations. They stay private on this device — nothing is uploaded.'}
              </span>
              <span className="import-actions">
                <button className="btn btn--small" onClick={() => folderInputRef.current?.click()}>
                  Choose folder
                </button>
                <button className="btn btn--ghost btn--small" onClick={() => filesInputRef.current?.click()}>
                  Choose files
                </button>
              </span>
            </span>
          </li>
        </ol>

        {error && <p className="import-error">{error}</p>}
        <p className="soft-note">
          This app includes no audio of its own — add only recordings you own.
          Titles are read from the filenames (e.g. “05 Affirming Your
          Intentions.mp3”).
        </p>

        <HiddenInputs folderRef={folderInputRef} filesRef={filesInputRef} onPick={onPick} />
      </div>
    )
  }

  // ---- Library + player -------------------------------------------------
  return (
    <div className="page page--recordings">
      <h1 className="page__title">Practice</h1>

      {importing && (
        <div className="import-progress">
          Importing {importing.done}/{importing.total}…
          <div className="import-progress__bar">
            <span style={{ width: `${(importing.done / importing.total) * 100}%` }} />
          </div>
          <span className="import-progress__name">{importing.currentName}</span>
        </div>
      )}

      {!importing && (
        <ul className="track-list">
          {recordings.map((rec, i) => (
            <li key={rec.name}>
              <button
                className={'track' + (i === currentIndex ? ' track--active' : '')}
                onClick={() => loadTrack(i)}
              >
                <span className="track__num">
                  {i === currentIndex && isPlaying ? '❚❚' : rec.num != null ? String(rec.num).padStart(2, '0') : '♫'}
                </span>
                <span className="track__body">
                  <span className="track__title">{rec.title}</span>
                  <span className="track__meta">
                    {[formatLength(rec.duration), formatBytes(rec.size)]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="import-error">{error}</p>}

      <div className="recordings-manage">
        <button className="btn btn--ghost btn--small" onClick={() => folderInputRef.current?.click()}>
          Add more
        </button>
        <button
          className="btn btn--ghost btn--small btn--danger"
          onClick={() => {
            if (confirm('Remove all imported recordings from this device?')) {
              if (urlRef.current) URL.revokeObjectURL(urlRef.current)
              setCurrentIndex(null)
              setIsPlaying(false)
              void removeAll()
            }
          }}
        >
          Remove all
        </button>
        {usage.usage > 0 && (
          <span className="storage-note">{formatBytes(usage.usage)} stored on device</span>
        )}
      </div>

      {current && (
        <div className="player-bar">
          <div className="player-bar__title">
            {current.num != null ? `${String(current.num).padStart(2, '0')} · ` : ''}
            {current.title}
          </div>
          <input
            className="player-bar__seek"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const audio = audioRef.current
              if (audio) audio.currentTime = Number(e.target.value)
            }}
            aria-label="Seek"
          />
          <div className="player-bar__times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="player-bar__controls">
            <button className="ctrl" onClick={() => step(-1)} disabled={currentIndex === 0} aria-label="Previous">⏮</button>
            <button className="ctrl" onClick={() => skip(-15)} aria-label="Back 15 seconds">−15</button>
            <button className="ctrl ctrl--primary" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button className="ctrl" onClick={() => skip(15)} aria-label="Forward 15 seconds">+15</button>
            <button
              className="ctrl"
              onClick={() => step(1)}
              disabled={currentIndex === recordings.length - 1}
              aria-label="Next"
            >⏭</button>
          </div>
          <label className="player-bar__auto">
            <input
              type="checkbox"
              checked={autoplayNext}
              onChange={(e) => setAutoplayNext(e.target.checked)}
            />
            <span>Autoplay next when finished</span>
          </label>
        </div>
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onEnded}
      />

      <HiddenInputs folderRef={folderInputRef} filesRef={filesInputRef} onPick={onPick} />
    </div>
  )
}

function HiddenInputs({
  folderRef,
  filesRef,
  onPick,
}: {
  folderRef: React.RefObject<HTMLInputElement>
  filesRef: React.RefObject<HTMLInputElement>
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <input ref={folderRef} type="file" multiple hidden onChange={onPick} />
      <input ref={filesRef} type="file" accept="audio/*" multiple hidden onChange={onPick} />
    </>
  )
}
