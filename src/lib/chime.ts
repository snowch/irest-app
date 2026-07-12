// A soft, synthesized bell tone used to mark transitions between practice
// steps. This is generated with the Web Audio API (not a recorded file), keeps
// the app dependency-free, and is entirely optional / off by default.
//
// Note: this is distinct from the "recorded sessions" planned for a future
// version, which will attach real narration audio to each stage.

let ctx: AudioContext | null = null

export function playChime() {
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      ctx = new Ctor()
    }
    // Resume if the browser suspended the context until a user gesture.
    if (ctx.state === 'suspended') void ctx.resume()

    const now = ctx.currentTime
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)

    // Two partials for a warmer, bell-like timbre.
    for (const [freq, level] of [
      [528, 1],
      [1056, 0.35],
    ] as const) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      const partial = ctx.createGain()
      partial.gain.value = level
      osc.connect(partial)
      partial.connect(gain)
      osc.start(now)
      osc.stop(now + 2.5)
    }
  } catch {
    // Audio unavailable — silently ignore.
  }
}
