export default function About() {
  return (
    <div className="page page--reading">
      <h1 className="page__title">About</h1>

      <div className="prose">
        <p>
          <strong>iRest Journey</strong> is a free, open educational companion
          for learning and practicing Integrative Restoration (iRest), a modern
          meditation practice adapted from the ancient tradition of Yoga Nidra.
        </p>

        <h2>An educational tool, not medical advice</h2>
        <p>
          This app is for general education and personal practice. It is not a
          substitute for professional medical or mental-health care. Meditation
          can occasionally bring up strong emotions; if that happens, go gently,
          return to your Inner Resource, and stop if you need to. If you live
          with a significant health condition, please practice with the support
          of a qualified professional.
        </p>

        <h2>About iRest and its creators</h2>
        <p>
          iRest was developed by Richard Miller, PhD, and is taught by the
          Integrative Restoration Institute (IRI). "iRest" and "Integrative
          Restoration" are their marks. This app is an independent, unaffiliated
          project that teaches the publicly described framework in its own
          words; it does not reproduce IRI's proprietary scripts or recordings.
        </p>
        <p>
          To go deeper — including trained teachers, courses, and official
          recordings — visit the Integrative Restoration Institute at{' '}
          <a href="https://www.irest.org" target="_blank" rel="noreferrer">
            irest.org
          </a>
          .
        </p>

        <h2>Your own recordings</h2>
        <p>
          If you own a set of recorded iRest meditations, the{' '}
          <strong>Recordings</strong> tab lets you add them from your device and
          listen with your eyes closed. Titles are read from the filenames, and
          your audio is saved privately on this device so it works offline. This
          app does not include, sell, or share any recordings — please add only
          files you own.
        </p>

        <h2>Privacy</h2>
        <p>
          There are no accounts and no servers. Everything — including your
          progress — stays in your browser on your device.
        </p>
      </div>
    </div>
  )
}
