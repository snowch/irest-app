import { useState } from 'react'

/**
 * An illustrative figure with tap-to-enlarge. Shared by lesson and principle
 * pages. `src` is relative to the app base (a file in /public).
 */
export default function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt?: string
  caption?: string
}) {
  const [zoomed, setZoomed] = useState(false)
  const url = `${import.meta.env.BASE_URL}${src}`

  return (
    <>
      <figure className="principle-figure">
        <button
          type="button"
          className="principle-figure__btn"
          onClick={() => setZoomed(true)}
          aria-label="Enlarge diagram"
        >
          <img src={url} alt={alt ?? ''} loading="lazy" />
        </button>
        <figcaption>{caption ?? 'Tap the diagram to enlarge'}</figcaption>
      </figure>

      {zoomed && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt ?? 'Diagram'}
          onClick={() => setZoomed(false)}
        >
          <button className="lightbox__close" aria-label="Close">✕</button>
          <img src={url} alt={alt ?? ''} />
        </div>
      )}
    </>
  )
}
