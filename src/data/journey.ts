// Learn: the concepts behind iRest.
//
// Data-driven so content can grow without touching UI code. (Practice is now
// driven by the user's own imported recordings — see the Practice page.)

export interface Module {
  slug: string
  title: string
  minutes: number // approx reading time
  summary: string
  /** Rich body, one paragraph per array entry. */
  body: string[]
  /** Optional short reflection prompt to close the module. */
  reflection?: string
  /** Optional call-to-action link rendered at the end of the module. */
  cta?: { label: string; to: string }
  /** Optional illustrative image, relative to the app base (in /public). */
  image?: string
  imageAlt?: string
  /** Optional caption shown under the image. */
  imageCaption?: string
}

export const modules: Module[] = [
  {
    slug: 'what-is-irest',
    title: 'What is iRest?',
    minutes: 4,
    summary:
      'A gentle, evidence-informed meditation practice rooted in the ancient tradition of Yoga Nidra.',
    body: [
      'iRest — short for Integrative Restoration — is a research-informed form of meditation adapted from the ancient practice of Yoga Nidra, often described as "yogic sleep." It was developed by Richard Miller, PhD, and is taught today through the Integrative Restoration Institute.',
      'Unlike practices that ask you to concentrate hard or empty the mind, iRest invites a posture of welcoming. Whatever arises — a sensation, a feeling, a thought — is met with curiosity rather than resistance. Nothing has to change for the practice to work.',
      'The practice is usually done lying down or seated comfortably, with the eyes closed. You stay in a state the tradition calls "being awake while deeply relaxed" — restful, yet aware.',
      'This app teaches the framework and lets you practice it with recorded guidance. It is an educational companion, not a substitute for a trained iRest teacher or for the official recordings and courses offered by the Integrative Restoration Institute.',
    ],
    reflection:
      'Before you continue: what drew you to want to learn a practice like this?',
  },
  {
    slug: 'core-principles',
    title: 'The Core Principles',
    minutes: 6,
    summary:
      'A handful of foundational ideas that quietly shape everything you do in iRest.',
    body: [
      'Before the ten steps and the techniques, iRest rests on a few core principles. They are less like rules to follow and more like a lens through which the whole practice makes sense. You do not have to believe them at the outset — practice is how you test them for yourself.',
      'Underlying well-being is always present. Beneath every changing mood and sensation is a quiet ground of ease and okay-ness that is always here. iRest does not manufacture calm so much as help you notice the steadiness that was already present underneath the noise.',
      'Welcome everything. This is the heart of iRest — sometimes called radical welcoming. Each sensation, emotion, and thought is met with an inner "yes," without needing to fix it, fuel it, or push it away. Welcoming is not approving of or agreeing with an experience; it is simply allowing it to be here as you meet it.',
      'Nothing needs to change. The practice is not about reaching a special state or getting rid of what is unpleasant. It is about being present with what is. Paradoxically, it is this unconditional welcoming — rather than effort or force — that allows things to soften and move on their own.',
      'Feelings and emotions are messengers. Even difficult states carry useful information, often about an unmet need. Rather than suppressing or being swept away by them, you learn to greet the messenger, receive its message, and let it move through.',
      'Work with opposites, not against them. Much of iRest holds a state alongside its counter-state — agitation and calm, heaviness and lightness. Sensing both builds equanimity and loosens the grip of being run by either one.',
      'Being, not only doing. Alongside focused, effortful attention, iRest cultivates effortless resting — simply being the awareness in which experience arises. Both have their place; the practice gradually tips the balance toward being.',
      'You are the aware witness. Experiences endlessly come and go, but the awareness in which they appear is ever-present and unchanged. Recognizing yourself as this steady, aware presence — rather than as any passing state — is the deepest refuge iRest offers.',
    ],
    reflection:
      'Which of these principles feels most true to you right now — and which one do you most want to test in practice?',
    cta: { label: 'Explore each principle', to: '/principles' },
  },
  {
    slug: 'the-ten-steps',
    title: 'The Ten Steps, at a glance',
    minutes: 5,
    summary:
      'iRest unfolds through ten movements of awareness — a map you will return to again and again.',
    body: [
      'iRest is often taught as a sequence of ten steps or "tools." They are not a rigid ladder to climb; they relate to one another by role, not just order — as the map below shows.',
      '1. Heartfelt Mission — the compass. Your enduring longing, felt as if already true; it sets true north.',
      '2. Intention — the banks. Your aim for this session, chosen in service of the mission, channelling the flow toward where the compass already points.',
      '3. Inner Resource — the anchor. An inner place of safety you can drop back into from any layer, in a sit or mid-crisis.',
      '4. Body Sensing — the outermost layer softens and releases.',
      '5. Breath Sensing — breath sensed as living energy.',
      '6. Feelings & Emotions — each feeling met together with its opposite.',
      '7. Thoughts & Beliefs — thoughts witnessed, opposites held.',
      '8. Joy & Well-Being — a sense of underlying ease radiating through the body.',
      '9. Awareness Itself — the still centre; layers 4–8 happen within it, not before it.',
      '10. Integration — the return, carrying the centre back into daily life; it loops back to the mission you set at the start.',
      'You do not need to master these one at a time. The guided recordings move through them for you; over time the map becomes familiar.',
      'The map draws on the traditional five-kosha (sheath) model and on Richard Miller’s compass and river-banks framing of the protocol.',
    ],
    cta: { label: 'Explore each step', to: '/steps' },
    image: 'figures/ten-steps-map.webp',
    imageAlt:
      'A relational map of the ten steps: the Heartfelt Mission as a compass at the top pointing true north; Intention as river-banks channelling the flow inward; concentric layers 4–8 (body, breath, emotions, thoughts, joy) nested around a glowing still centre, 9 Awareness; the Inner Resource (3) as an anchor at the lower left reaching every layer; and Integration (10) as an arrow returning outward into daily life, looping back to the mission. Steps 6 and 7 hold opposites at once.',
    imageCaption:
      'The steps as relationships: mission orients, intention channels, the layers nest into awareness at the centre, and integration carries it back into daily life.',
  },
  {
    slug: 'intention-and-desire',
    title: 'Intention & Heartfelt Desire',
    minutes: 4,
    summary:
      'Two foundational tools that give your practice direction and depth.',
    body: [
      'An Intention is a simple statement of what you are here to do — for example, "I intend to rest and be present." Held lightly at the start of practice, it orients the mind like setting a compass before a walk.',
      'A Heartfelt Desire (sometimes called your deepest longing) is different. It is not about a task; it is the underlying yearning of your life — perhaps for peace, for wholeness, for connection. In iRest you sense it as if it were already true, feeling it in the body rather than only thinking it.',
      'Both are affirmations you form in your own words. There is no correct wording — what matters is that the statement feels genuine when you rest your attention on it. You can set yours in the Prepare tab.',
    ],
    reflection:
      'If you had to put your deepest longing into one short sentence, what might it be?',
    cta: { label: 'Set your foundations', to: '/prepare' },
  },
  {
    slug: 'inner-resource',
    title: 'Your Inner Resource',
    minutes: 4,
    summary:
      'A personal refuge of calm you can return to any time — in practice and in daily life.',
    body: [
      'The Inner Resource is one of the most practical tools in iRest. It is an inner experience of security, ease, and well-being that remains available regardless of outer circumstances.',
      'You build it by recalling — or imagining — a place, memory, or felt sense where you feel completely safe and at ease. It might be a quiet beach, a chair by a window, being held by someone you trust, or simply a warm feeling with no image at all.',
      'The point is not the scene but the felt sense of okay-ness it evokes in your body. With practice, you can call it up in seconds, making it a resource during difficult moments long after the meditation ends.',
    ],
    reflection:
      'Where — real or imagined — do you feel most completely at ease?',
  },
  {
    slug: 'welcoming-opposites',
    title: 'Welcoming Opposites',
    minutes: 4,
    summary:
      'A distinctive iRest move: holding contrasting sensations, feelings, or thoughts together.',
    body: [
      'Much of iRest works with pairs of opposites — warmth and coolness, heaviness and lightness, ease and agitation, or a feeling and its counter-feeling.',
      'You first sense one side fully, then its opposite, and finally — if it feels right — both at the same time. This is not analysis; it is a felt experiment in the body.',
      'Practicing with opposites gently loosens the mind\'s habit of grasping one state and pushing another away. Over time it builds equanimity: the capacity to remain steady and open whatever is present.',
    ],
  },
  {
    slug: 'practice-and-safety',
    title: 'Practicing Well & Safely',
    minutes: 3,
    summary: 'Simple guidance for getting the most from practice — and when to go gently.',
    body: [
      'Find a position you can hold comfortably — lying down with support under the knees, or seated with a tall, relaxed spine. Warmth and quiet help.',
      'There is no such thing as doing it wrong. Drifting off, getting distracted, feeling restless — all of it is welcome. You simply begin again, without judgment.',
      'iRest is generally gentle, but meditation can sometimes surface strong emotions or memories. If that happens, it is completely fine to open your eyes, move, or stop. Return to your Inner Resource, and go at a pace that feels safe.',
      'If you live with significant trauma, anxiety, or another mental-health condition, consider practicing with the support of a trained iRest teacher or a health professional. This app is educational and is not medical advice.',
    ],
  },
]

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug)
}
