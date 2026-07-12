# iRest Journey

An installable web app that guides you through **learning and practicing iRest**
(Integrative Restoration) — a gentle, research-informed meditation practice
adapted from Yoga Nidra.

🧘 **Live app:** https://snowch.github.io/irest-app/

## What it does

- **Learn** — six short lessons introduce the iRest framework and its ten steps.
- **Practice** — self-paced, text-guided sessions that move through the stages
  with a gentle timer (and an optional transition chime).
- **Progress** — tracks lessons read, sessions completed, and a daily streak,
  stored privately in your browser.
- **Installable & offline** — a Progressive Web App you can add to your home
  screen and use without a connection.

> This is an independent educational companion. It is **not medical advice** and
> is **not affiliated with** the Integrative Restoration Institute (IRI), who
> created iRest. For trained teachers, courses, and official recordings, visit
> [irest.org](https://www.irest.org). See the in-app **About** page for details.

## Tech

- [Vite](https://vitejs.dev/) + React + TypeScript
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the installable /
  offline PWA
- Client-side routing via `HashRouter` (deep links work on GitHub Pages)
- No backend — progress lives in `localStorage`

## Develop

```bash
npm install
npm run dev            # local dev server
npm run build          # production build to dist/
npm run preview        # preview the production build
npm run generate-icons # regenerate PWA icons from the source SVG
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment
→ Source** and choose **GitHub Actions**.

The app is served from `/irest-app/` (configured as `base` in
[`vite.config.ts`](./vite.config.ts)). If you rename the repository, update that
value to match.

## Content model

All learning and practice content lives in
[`src/data/journey.ts`](./src/data/journey.ts). It is data-driven so content can
grow without touching UI code.

### Roadmap: recorded audio

Each practice `Stage` already has an optional `audioUrl` field. A future version
will attach recorded narration to each stage; the player will play the audio
where present and fall back to the timed text guidance otherwise.

## License

Content and code are provided for educational use. "iRest" and "Integrative
Restoration" are marks of the Integrative Restoration Institute; this project is
unaffiliated and teaches the publicly described framework in its own words.
