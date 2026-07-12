// The learning-and-practice journey content.
//
// This is intentionally data-driven so that content can grow over time without
// touching UI code. In particular, each practice `Stage` has an optional
// `audioUrl` field: today it is undefined (text-guided only), and a future
// version can point it at a recorded session with no other changes required.

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
}

export interface Stage {
  key: string
  title: string
  /** Short label used in the stepper. */
  label: string
  /** Guidance shown to the practitioner, one line/paragraph per entry. */
  guidance: string[]
  /** Suggested duration in seconds for the self-paced timer. */
  seconds: number
  /** Future: URL to a recorded narration for this stage. */
  audioUrl?: string
}

export interface Practice {
  slug: string
  title: string
  subtitle: string
  /** Total approx minutes (derived, but stored for quick display). */
  minutes: number
  level: 'Foundational' | 'Core' | 'Extended'
  intro: string
  stages: Stage[]
}

// ---------------------------------------------------------------------------
// Learn: the concepts behind iRest
// ---------------------------------------------------------------------------

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
      'This app teaches the framework and lets you practice it at your own pace with written guidance. It is an educational companion, not a substitute for a trained iRest teacher or for the official recordings and courses offered by the Integrative Restoration Institute.',
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
      'iRest is often taught as a sequence of ten steps or "tools." They are not a rigid ladder to climb; think of them as movements of awareness that gradually open different dimensions of your experience.',
      '1. Intention — affirming your reason for practicing right now.',
      '2. Heartfelt Desire — sensing your deepest longing for well-being.',
      '3. Inner Resource — establishing an inner place of safety, ease, and security.',
      '4. Body Sensing — rotating awareness through the body to release and settle.',
      '5. Breath Sensing — feeling the natural movement of breath and energy.',
      '6. Feelings & Emotions — welcoming feelings and their opposites without judgment.',
      '7. Thoughts & Beliefs — noticing thoughts and the beliefs beneath them.',
      '8. Joy & Well-Being — allowing a sense of underlying ease and gladness.',
      '9. Awareness Itself — resting as the aware presence in which everything appears.',
      '10. Reflection & Integration — carrying the practice gently back into daily life.',
      'You do not need to master these one at a time. The guided practices in this app move through them for you; over time the map becomes familiar.',
    ],
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
      'Both are affirmations you form in your own words. There is no correct wording — what matters is that the statement feels genuine when you rest your attention on it.',
    ],
    reflection:
      'If you had to put your deepest longing into one short sentence, what might it be?',
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

// ---------------------------------------------------------------------------
// Practice: self-paced guided sessions
// ---------------------------------------------------------------------------

export const practices: Practice[] = [
  {
    slug: 'first-rest',
    title: 'A First Rest',
    subtitle: 'A short, gentle introduction',
    minutes: 6,
    level: 'Foundational',
    intro:
      'A brief practice to taste the feeling of iRest. Find a comfortable position, and let the words guide you at their own unhurried pace.',
    stages: [
      {
        key: 'settle',
        label: 'Settle',
        title: 'Settling In',
        seconds: 45,
        guidance: [
          'Let yourself arrive. Allow your body to be supported by whatever is beneath you.',
          'There is nowhere to go and nothing to achieve in these few minutes.',
          'Let the eyes close, or soften your gaze downward.',
        ],
      },
      {
        key: 'intention',
        label: 'Intention',
        title: 'Setting an Intention',
        seconds: 40,
        guidance: [
          'Silently affirm a simple intention for this practice.',
          'Perhaps: "I intend to rest, and to be present with whatever is here."',
          'Feel the intention settle in, like a stone coming to rest at the bottom of a still pond.',
        ],
      },
      {
        key: 'resource',
        label: 'Resource',
        title: 'Inner Resource',
        seconds: 60,
        guidance: [
          'Bring to mind a place or memory where you feel completely safe and at ease.',
          'Notice the felt sense of well-being it brings — perhaps warmth, spaciousness, or calm.',
          'Know that this feeling is always available to you. You can return here any time.',
        ],
      },
      {
        key: 'body',
        label: 'Body',
        title: 'Body Sensing',
        seconds: 90,
        guidance: [
          'Gently move your awareness through the body.',
          'Sense the weight of the head... the softening of the face and jaw... the shoulders releasing down.',
          'The arms and hands... the chest and belly rising and falling... the hips, the legs, the feet.',
          'No need to change anything. Simply feel the body as it is.',
        ],
      },
      {
        key: 'breath',
        label: 'Breath',
        title: 'Breath Sensing',
        seconds: 60,
        guidance: [
          'Let your attention rest on the natural movement of the breath.',
          'Feel the cool inflow... and the warm, releasing outflow.',
          'You are not controlling the breath — simply being breathed.',
        ],
      },
      {
        key: 'rest',
        label: 'Rest',
        title: 'Resting in Awareness',
        seconds: 45,
        guidance: [
          'For a few moments, let go of any effort at all.',
          'Rest as the simple awareness in which sensations, sounds, and thoughts come and go.',
          'Nothing to do. Nowhere to be. Just this.',
        ],
      },
      {
        key: 'return',
        label: 'Return',
        title: 'Reflection & Return',
        seconds: 40,
        guidance: [
          'Begin to sense the room around you, the support beneath you.',
          'Take a fuller breath, and let a little movement return to the fingers and toes.',
          'As you open your eyes, carry this sense of ease with you into whatever comes next.',
        ],
      },
    ],
  },
  {
    slug: 'ten-tools',
    title: 'The Ten Tools',
    subtitle: 'A complete pass through the full framework',
    minutes: 18,
    level: 'Core',
    intro:
      'This longer practice moves through all ten movements of iRest. Settle in somewhere you will not be disturbed, and let each step unfold without hurry.',
    stages: [
      {
        key: 'settle',
        label: 'Settle',
        title: 'Settling In',
        seconds: 60,
        guidance: [
          'Arrive fully. Let the body be completely supported.',
          'Allow a few slower breaths, and let the eyes close.',
        ],
      },
      {
        key: 'intention',
        label: 'Intention',
        title: '1. Intention',
        seconds: 60,
        guidance: [
          'Affirm your intention for this practice in your own words.',
          'Hold it lightly, feeling its truth in the body.',
        ],
      },
      {
        key: 'desire',
        label: 'Desire',
        title: '2. Heartfelt Desire',
        seconds: 75,
        guidance: [
          'Sense your deepest longing — for peace, wholeness, or ease.',
          'Affirm it as if it were already true, feeling it fill the body.',
        ],
      },
      {
        key: 'resource',
        label: 'Resource',
        title: '3. Inner Resource',
        seconds: 90,
        guidance: [
          'Return to your inner place of safety and well-being.',
          'Let its calm suffuse you. This is your refuge, always available.',
        ],
      },
      {
        key: 'body',
        label: 'Body',
        title: '4. Body Sensing',
        seconds: 150,
        guidance: [
          'Rotate awareness slowly through the body — mouth, throat, shoulders, arms, hands.',
          'The chest and belly... the back... the hips, legs, and feet.',
          'Sense the whole body at once, held in awareness, exactly as it is.',
        ],
      },
      {
        key: 'breath',
        label: 'Breath',
        title: '5. Breath Sensing',
        seconds: 90,
        guidance: [
          'Feel the breath moving freely, without effort.',
          'Sense the subtle flow of energy and aliveness through the body.',
        ],
      },
      {
        key: 'feelings',
        label: 'Feelings',
        title: '6. Feelings & Emotions',
        seconds: 120,
        guidance: [
          'Welcome whatever feeling is present, and where you sense it in the body.',
          'Now sense its opposite. Then, if it feels right, hold both together.',
          'Let feelings come and go like weather across an open sky.',
        ],
      },
      {
        key: 'thoughts',
        label: 'Thoughts',
        title: '7. Thoughts & Beliefs',
        seconds: 105,
        guidance: [
          'Notice thoughts arising and dissolving, without following them.',
          'If a belief appears, sense it — and then its opposite — with the same open curiosity.',
        ],
      },
      {
        key: 'joy',
        label: 'Joy',
        title: '8. Joy & Well-Being',
        seconds: 90,
        guidance: [
          'Invite a sense of underlying ease, contentment, or quiet gladness.',
          'You need not manufacture it — simply allow whatever warmth is here to be felt.',
        ],
      },
      {
        key: 'awareness',
        label: 'Awareness',
        title: '9. Awareness Itself',
        seconds: 120,
        guidance: [
          'Let go of all effort. Rest as awareness itself.',
          'Everything — sensation, feeling, thought — appears and disappears within this open, aware presence that you are.',
        ],
      },
      {
        key: 'reflect',
        label: 'Reflect',
        title: '10. Reflection & Integration',
        seconds: 90,
        guidance: [
          'Gently reflect on your experience, without analysis.',
          'Sense how this ease might travel with you into daily life.',
          'Slowly reawaken the body, and when you are ready, open your eyes.',
        ],
      },
    ],
  },
  {
    slug: 'inner-resource-mini',
    title: 'Inner Resource Reset',
    subtitle: 'A 3-minute refuge for busy moments',
    minutes: 3,
    level: 'Foundational',
    intro:
      'A very short practice to strengthen and return to your Inner Resource. Perfect between meetings or whenever you need to steady yourself.',
    stages: [
      {
        key: 'pause',
        label: 'Pause',
        title: 'Pause',
        seconds: 30,
        guidance: [
          'Wherever you are, pause. You can keep your eyes open or closed.',
          'Take one slow breath, and feel your feet or your seat.',
        ],
      },
      {
        key: 'recall',
        label: 'Recall',
        title: 'Recall Your Resource',
        seconds: 60,
        guidance: [
          'Bring to mind your place of safety and ease.',
          'Let the felt sense of it arrive in the body — warmth, steadiness, calm.',
        ],
      },
      {
        key: 'soak',
        label: 'Soak',
        title: 'Soak It In',
        seconds: 45,
        guidance: [
          'Rest here for a few breaths, letting the feeling deepen.',
          'This calm is yours. It travels with you.',
        ],
      },
      {
        key: 'carry',
        label: 'Carry',
        title: 'Carry It Forward',
        seconds: 25,
        guidance: [
          'Take one more slow breath.',
          'Return to your day, bringing a little of this ease with you.',
        ],
      },
    ],
  },
]

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug)
}

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug)
}
