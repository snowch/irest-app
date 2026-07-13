// The core principles of iRest, each as its own page, plus a canonical catalog
// of the recorded-meditation set so principle pages can reference the tracks
// that relate to them.
//
// `relatedTracks` are track numbers (the leading "NN" in the filenames such as
// "02 Messenger Meditation.mp3"). The Recordings tab matches a user's imported
// files by that number, so these links work whether or not a given file has
// been imported yet — the mapping is entirely by number and easy to edit.

export interface Principle {
  slug: string
  title: string
  /** One-line summary for the index cards. */
  summary: string
  body: string[]
  /** Track numbers of recordings that relate to this principle. */
  relatedTracks: number[]
  /** Optional illustrative image, relative to the app base (in /public). */
  image?: string
  /** Alt text describing the image for screen readers. */
  imageAlt?: string
}

export const principles: Principle[] = [
  {
    slug: 'underlying-well-being',
    title: 'Underlying well-being is always present',
    summary: 'Ease and wholeness are already here, beneath the surface.',
    body: [
      'One of iRest’s foundational insights is that a sense of well-being — ease, okay-ness, wholeness — is not something you have to build from scratch. It is already present, quietly, underneath the surface weather of the mind.',
      'In practice you don’t force calm. You gently turn toward the steadiness that is already here, often through the Inner Resource: a felt sense of safety and ease you can return to at will.',
      'Over time this reorients how you meet hard moments. Instead of chasing a better state, you remember the ground of well-being that was never actually missing.',
    ],
    relatedTracks: [6, 7, 20, 36, 24],
    image: 'principles/underlying-well-being.webp',
    imageAlt:
      'An ocean diagram: at the surface, weather (worry, stress, sadness, confusion, joy, excitement) representing passing thoughts, emotions, and sensations; beneath it the calm deep water labelled underlying well-being — steady, spacious, whole. The Inner Resource and the practice of turning toward it point to the depths. Key insight: well-being is the ground; you are the sky.',
  },
  {
    slug: 'welcome-everything',
    title: 'Welcome everything',
    summary: 'Meet every experience with an inner “yes.”',
    body: [
      'Radical welcoming is the heart of iRest. Whatever arises — a sensation, an emotion, a thought, even resistance itself — is met with an inner “yes,” a willingness to let it be exactly as it is.',
      'Welcoming is not the same as liking, approving, or agreeing. You can welcome anger or grief without being run by it. You are simply dropping the war with your own experience.',
      'Paradoxically, this is what allows things to move. What is fully met tends to soften and release on its own, without you having to fix or force anything.',
    ],
    relatedTracks: [16, 21, 17, 22, 28],
    image: 'principles/welcome-everything.webp',
    imageAlt:
      'A diagram of an open doorway with the word “yes” glowing in the opening. On the left, experiences arrive — sensation, emotion, thought, and resistance; on the right they leave softened — softening, passing, easing. Welcoming is not liking, approving, or agreeing; it is dropping the war with your experience and letting it be as it is. What is fully met softens and releases on its own; even resistance is welcome.',
  },
  {
    slug: 'nothing-needs-to-change',
    title: 'Nothing needs to change',
    summary: 'No special state to reach — be present with what is.',
    body: [
      'iRest is not a self-improvement project. There is no special state to attain and nothing about you that needs repairing before you can rest.',
      'This takes the pressure off. You are not trying to relax harder or meditate “correctly.” You are learning to be present with what is already here — restlessness, sleepiness, quiet, all of it welcome.',
      'Curiously, letting go of the demand to change is often what allows genuine change to happen. Ease arrives not by effort, but by permission.',
    ],
    relatedTracks: [9, 10, 11, 26, 27],
    image: 'principles/nothing-needs-to-change.webp',
    imageAlt:
      'A diagram of a path with a “you are here” marker already at the destination, while a flag labelled “a better state to chase” further along is crossed out. You are not doing it wrong by feeling restless; you are simply present with what is. Paradoxically, letting go of the demand to change is what allows change to happen — ease arrives by permission, not effort.',
  },
  {
    slug: 'feelings-are-messengers',
    title: 'Feelings and emotions are messengers',
    summary: 'Emotions carry a message — receive it, then let it go.',
    body: [
      'In iRest, feelings and emotions are treated as messengers rather than problems. Each carries information — often about a need, a value, or something asking to be acknowledged.',
      'Instead of suppressing a feeling or being swept away by it, you turn toward it with curiosity: Where do I sense it in the body? What is it here to tell me? You receive the message, and then let the messenger go.',
      'Met this way, even difficult emotions become workable. They come and go like weather, and you remain the open sky in which they move.',
    ],
    relatedTracks: [2, 16, 17, 21],
    image: 'principles/feelings-are-messengers.webp',
    imageAlt:
      'A diagram showing a feeling arriving, an envelope carrying a message, and the feeling moving on once received. A feeling is not a problem to remove but a messenger carrying information — often an unmet need. Rather than suppressing it or being swept away by it, turn toward it with curiosity: where do I feel it, and what is it here to tell me? Met this way, feelings come and go like weather while you remain the open sky.',
  },
  {
    slug: 'work-with-opposites',
    title: 'Work with opposites',
    summary: 'Hold a state and its opposite to grow equanimity.',
    body: [
      'Much of iRest works with pairs of opposites — tension and ease, heaviness and lightness, sadness and joy, or a feeling and its counter-feeling.',
      'You sense one side fully in the body, then its opposite, and finally, if it feels right, both together. This is not analysis; it is a felt experiment.',
      'Holding opposites gently loosens the mind’s habit of grasping one state and pushing another away. What grows in its place is equanimity — the capacity to stay steady and open whatever is present.',
    ],
    relatedTracks: [18, 19, 22, 15],
    image: 'principles/work-with-opposites.webp',
    imageAlt:
      'A diagram of a level balance holding opposite states together: tension, heaviness, and sadness on one side; ease, lightness, and joy on the other. You sense one side fully, then its opposite, then both together — a felt experiment, not analysis. This loosens the mind’s habit of grasping one state and pushing the other away, and what grows is equanimity: staying steady and open whatever is present. You don’t have to pick a side.',
  },
  {
    slug: 'being-not-doing',
    title: 'Being, not only doing',
    summary: 'Balance doing with simply resting as awareness.',
    body: [
      'Most of life is spent doing — planning, achieving, fixing. iRest makes room for the other half: simply being, resting as aware presence with nothing to accomplish.',
      'In practice this shows up as effortlessness. Alongside focused attention, you learn to let go of all effort and rest in open awareness — being breathed, being aware, doing nothing.',
      'This isn’t laziness; it’s balance. Returning to being restores what constant doing depletes, and it’s available in the middle of an ordinary day, not only in formal practice.',
    ],
    relatedTracks: [29, 31, 32, 38],
    image: 'principles/being-not-doing.webp',
    imageAlt:
      'A diagram contrasting two modes: “doing” (a busy, spinning circle — planning and fixing) and “being” (a still, calm circle — resting as awareness), held in balance. Most of life is spent doing; iRest makes room for the other half. Doing is necessary but depletes when it never pauses, while being is effortless — simply resting as the awareness in which experience arises, with nothing to accomplish. Not laziness but balance: nothing to achieve, just be.',
  },
  {
    slug: 'aware-witness',
    title: 'You are the aware witness',
    summary: 'You are the unchanging awareness in which all appears.',
    body: [
      'Everything you experience — sensations, feelings, thoughts — is constantly changing. But the awareness in which all of it appears does not change. iRest points you again and again to that aware presence.',
      'You are not only the passing states; you are the space in which they arise and dissolve. Resting as this witnessing awareness is deeply steadying — states may be stormy, but awareness itself is untroubled.',
      'This is the deepest refuge iRest offers: recognizing yourself as the ever-present awareness that was never actually disturbed by anything that came and went.',
    ],
    relatedTracks: [30, 33, 34, 35, 36],
    image: 'principles/aware-witness.webp',
    imageAlt:
      'A diagram of passing states — a thought, an emotion, a sensation, a mood — drifting above a steady band labelled “awareness, ever-present, unchanged.” Everything you experience is always coming and going, but the awareness in which it all appears does not change. Resting as this aware presence is the deepest refuge: states may be stormy, but awareness itself is untroubled. States come and go; the one aware of them remains.',
  },
]

export function getPrinciple(slug: string): Principle | undefined {
  return principles.find((p) => p.slug === slug)
}

// ---------------------------------------------------------------------------
// Canonical catalog of the recorded set (title per track number).
// Used to label related recordings that a user hasn't imported yet. When a
// file *is* imported, its own parsed title is preferred over this. Titles are
// transcribed from the standard set and are easy to correct here.
// ---------------------------------------------------------------------------

export const recordingCatalog: Record<number, string> = {
  0: 'Intro to iRest Practices',
  1: 'Experiencing Yourself as Sensation',
  2: 'Messenger Meditation',
  3: 'Forgetting and Remembering',
  4: 'Affirming Your Heartfelt Mission',
  5: 'Affirming Your Intentions',
  6: 'Experiencing Your Inner Resource',
  7: 'Inner Resource Meditation',
  8: 'Sensing Your Hands',
  9: 'Peeling Away Tension',
  10: 'Progressive Muscle Relaxation',
  11: 'Body Sensing with Autogenics',
  12: 'Noticing Flows of Inhalation and Exhalation',
  13: 'Noticing Flows of Sensation',
  14: 'Breath Counting',
  15: 'Experiencing Your Focusing and Diffusing',
  16: 'Welcoming Your Feelings and Emotions',
  17: 'ProActively Engaging Feelings and Emotions',
  18: 'Welcoming Opposites of Feeling and Emotion',
  19: 'Creating Continuums of Opposites',
  20: 'Inner Weaving Your Inner Resource',
  21: 'Welcoming Feelings and Emotions',
  22: 'Welcoming Opposites of Thought',
  23: 'Enhancing Joy',
  24: 'Welcoming Joy and Well Being',
  25: 'Welcoming Joy with Stress',
  26: '12 min Healing iRest Nap',
  27: 'iRest for Sleep',
  28: 'Welcoming Gratitude',
  29: 'Being Awareness',
  30: 'Qualities of Awareness',
  31: 'Entering the Stream of Awareness',
  32: 'Being Awareness',
  33: 'Who Am I',
  34: 'Unchanging Awareness',
  35: 'I Am',
  36: 'Experiencing Your Wholeness',
  37: '8 min iRest',
  38: '20 min iRest',
  39: '35 min iRest',
  40: 'The Practice of Gratitude',
  41: 'Day’s Review',
  42: 'A Final Meditation',
}

export function catalogTitle(num: number): string {
  return recordingCatalog[num] ?? `Track ${num}`
}
