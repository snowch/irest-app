import { Link, useNavigate } from 'react-router-dom'
import { catalogTitle } from '../data/principles'
import { useRecordings } from '../hooks/useRecordings'
import { formatLength } from '../lib/recordings'

/**
 * The "Related recordings" section shared by principle and step pages. Given a
 * list of track numbers, it shows each as a tap-to-play link (with length) when
 * the file is imported, or a muted "Add" row otherwise.
 */
export default function RelatedRecordings({ tracks }: { tracks: number[] }) {
  const navigate = useNavigate()
  const { recordings } = useRecordings()

  const related = tracks.map((num) => {
    const imported = recordings.find((r) => r.num === num)
    return {
      num,
      title: imported?.title ?? catalogTitle(num),
      available: Boolean(imported),
      length: formatLength(imported?.duration),
    }
  })

  return (
    <>
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
                {r.length && <span className="rec-link__len">{r.length}</span>}
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
    </>
  )
}
