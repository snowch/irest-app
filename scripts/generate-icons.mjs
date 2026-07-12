// Generates PWA PNG icons from a single source SVG using sharp.
// Run: npm run generate-icons
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/icons')
await mkdir(outDir, { recursive: true })

// Plain icon: ripple mark on a rounded brand tile.
const plain = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#2e4a5f"/>
  <g fill="none" stroke="#f0e6d8" stroke-width="16" opacity="0.95">
    <circle cx="256" cy="272" r="46"/>
    <circle cx="256" cy="272" r="104"/>
    <circle cx="256" cy="272" r="162"/>
  </g>
  <circle cx="256" cy="272" r="22" fill="#cf9a75"/>
</svg>`

// Maskable icon: same mark but centered within the safe zone (no corner radius,
// full-bleed background so platform masks can crop freely).
const maskable = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#2e4a5f"/>
  <g fill="none" stroke="#f0e6d8" stroke-width="14" opacity="0.95">
    <circle cx="256" cy="256" r="38"/>
    <circle cx="256" cy="256" r="86"/>
    <circle cx="256" cy="256" r="134"/>
  </g>
  <circle cx="256" cy="256" r="18" fill="#cf9a75"/>
</svg>`

async function render(svg, size, name) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(resolve(outDir, name))
  console.log('wrote', name)
}

await render(plain, 192, 'icon-192.png')
await render(plain, 512, 'icon-512.png')
await render(maskable, 512, 'icon-maskable-512.png')
// Apple touch icon (no transparency, 180px)
await render(plain, 180, '../apple-touch-icon.png')
console.log('done')
