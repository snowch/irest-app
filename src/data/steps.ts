// The ten steps of iRest, each as its own page. Ordered per the relational
// map: the mission orients, the intention serves it, the inner resource
// anchors, the koshas (sheaths) nest inward to awareness at the centre, and
// integration carries it back into daily life.

export interface Step {
  slug: string
  num: number
  title: string
  /** Short role/metaphor, e.g. "The compass". */
  role: string
  /** Optional kosha/sheath name for the nested layers (4–8). */
  kosha?: string
  /** One-line summary for the index cards. */
  summary: string
  body: string[]
  /** Track numbers of recordings that relate to this step. */
  relatedTracks: number[]
}

export const steps: Step[] = [
  {
    slug: 'heartfelt-mission',
    num: 1,
    title: 'Heartfelt Mission',
    role: 'The compass — true north',
    summary: 'Your deepest longing, felt as if already true.',
    body: [
      'Your Heartfelt Mission is the deepest longing of your life — for peace, wholeness, freedom, or connection. In iRest it is treated as your compass: singular, stable, and sensed as if it were already true.',
      'You affirm it first, before anything else, because everything that follows is in its service. Held in the body rather than only thought, it sets the direction — true north — for the whole practice.',
      'You can write yours in the Prepare tab and return to it at the start of each session.',
    ],
    relatedTracks: [4],
  },
  {
    slug: 'intention',
    num: 2,
    title: 'Intention',
    role: 'The banks that channel the flow',
    summary: 'Your aim for this session, in service of the mission.',
    body: [
      'An Intention is your aim for this particular session or chapter of life. Unlike the mission, it can be many things and shifts with circumstance.',
      'It does not set the direction; it channels the flow toward where the compass already points — like the banks of a river. Chosen in service of your mission, it orients this sit.',
      'Keep it simple and present-tense, and hold it lightly as you begin.',
    ],
    relatedTracks: [5],
  },
  {
    slug: 'inner-resource',
    num: 3,
    title: 'Inner Resource',
    role: 'The anchor — reach it from any layer',
    summary: 'An inner place of safety you can return to anytime.',
    body: [
      'Your Inner Resource is an inner experience of safety, ease, and well-being that stays available whatever is happening around you.',
      'It is not a step you pass through once; it is an anchor you can drop back into from any layer of practice — or in the middle of a hard day. Build it from a place, memory, or felt sense of complete ease.',
      'With practice you can call it up in a few breaths.',
    ],
    relatedTracks: [6, 7, 20],
  },
  {
    slug: 'body-sensing',
    num: 4,
    title: 'Body Sensing',
    role: 'The outermost layer softens',
    kosha: 'annamaya · the physical sheath',
    summary: 'Rotating awareness through the body to release and settle.',
    body: [
      'Body Sensing rotates awareness through the body — a systematic tour of sensation that lets the physical layer soften and settle.',
      'This is the outermost of the koshas, or sheaths: the annamaya, the body “made of food.” Nothing needs to change; you simply feel each region as it is.',
      'As attention moves, held tension is often released without any effort.',
    ],
    relatedTracks: [8, 9, 10, 11, 1, 13],
  },
  {
    slug: 'breath-sensing',
    num: 5,
    title: 'Breath Sensing',
    role: 'Breath as living energy',
    kosha: 'prāṇamaya · the energy sheath',
    summary: 'Feeling the natural movement of breath and energy.',
    body: [
      'Here breath is sensed not as something to control but as living energy moving through you — the prāṇamaya kosha, the energy sheath.',
      'You feel the natural flow of inhalation and exhalation, and the subtle sense of aliveness it carries, letting attention rest on the movement rather than directing it.',
    ],
    relatedTracks: [12, 14],
  },
  {
    slug: 'feelings-and-emotions',
    num: 6,
    title: 'Feelings & Emotions',
    role: 'Each feeling met with its opposite',
    kosha: 'manomaya · the feeling sheath',
    summary: 'Welcoming feelings and their opposites without judgment.',
    body: [
      'At the feeling sheath — manomaya — you welcome whatever emotion is present, and notice where you sense it in the body.',
      'The distinctive iRest move is to meet each feeling together with its opposite: sensing one, then its counter-feeling, then, if it feels right, both at once. This builds equanimity and loosens the grip of any single state.',
    ],
    relatedTracks: [16, 17, 18, 21],
  },
  {
    slug: 'thoughts-and-beliefs',
    num: 7,
    title: 'Thoughts & Beliefs',
    role: 'Witnessing thoughts, holding opposites',
    kosha: 'vijñānamaya · the intellect sheath',
    summary: 'Noticing thoughts and the beliefs beneath them.',
    body: [
      'At the intellect sheath — vijñānamaya — you notice thoughts, images, and the beliefs beneath them, watching them arise and dissolve without following.',
      'As with feelings, you can hold a belief alongside its opposite, meeting both with the same open, unhurried curiosity.',
    ],
    relatedTracks: [22, 19, 15],
  },
  {
    slug: 'joy-and-well-being',
    num: 8,
    title: 'Joy & Well-Being',
    role: 'Underlying ease radiating outward',
    kosha: 'ānandamaya · the bliss sheath',
    summary: 'Allowing a sense of underlying ease and gladness.',
    body: [
      'The bliss sheath — ānandamaya — is a sense of underlying ease, contentment, or quiet gladness that does not depend on circumstances.',
      'You need not manufacture it; you simply allow whatever warmth is present to be felt, letting it radiate through the body.',
    ],
    relatedTracks: [23, 24, 25, 28, 40],
  },
  {
    slug: 'awareness',
    num: 9,
    title: 'Awareness Itself',
    role: 'The still centre',
    summary: 'Resting as the aware presence in which everything appears.',
    body: [
      'Beneath and within all the layers is awareness itself — the still centre in which every sensation, feeling, and thought appears and dissolves.',
      'This is not a further layer to reach but the ground the others happen within. The koshas are movements within awareness, not stations before it.',
      'Resting here, as the aware presence you already are, is the heart of iRest.',
    ],
    relatedTracks: [29, 30, 31, 32, 33, 34, 35, 36],
  },
  {
    slug: 'integration',
    num: 10,
    title: 'Integration',
    role: 'The return — carry the centre back into life',
    summary: 'Carrying the practice gently back into daily life.',
    body: [
      'Integration is the return: gently carrying the stillness of the centre back out through every layer and into daily life.',
      'It is not an ending but a bookend — it loops back to the mission you set at the start, delivering into your life what the practice touched. You reflect briefly, then reawaken and move on, bringing a little of that ease with you.',
    ],
    relatedTracks: [41, 42, 3],
  },
]

export function getStep(slug: string): Step | undefined {
  return steps.find((s) => s.slug === slug)
}
