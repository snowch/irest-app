// The three personal foundations a practitioner establishes before practicing
// iRest, and brings to every session. Each has an AI prompt the user can copy
// into an assistant to help them articulate it in their own words.

export type FoundationKey = 'mission' | 'intention' | 'innerResource'

export interface Foundation {
  key: FoundationKey
  title: string
  short: string
  description: string[]
  placeholder: string
  aiPrompt: string
}

export const foundations: Foundation[] = [
  {
    key: 'mission',
    title: 'Heartfelt Mission',
    short: 'Your deepest longing, stated as already true.',
    description: [
      'Your Heartfelt Mission (sometimes called your Heartfelt Desire) is the deepest longing of your life — for peace, wholeness, connection, or freedom.',
      'Phrase it simply and in the present tense, as if it were already true — for example, “I live with peace and an open heart.” You will affirm it at the start of practice, feeling it in the body rather than only thinking it.',
    ],
    placeholder: 'e.g. I live with peace and an open heart.',
    aiPrompt:
      "I'm practising iRest (Integrative Restoration) meditation and want to articulate my Heartfelt Mission — the deepest longing or calling of my life, stated in the present tense as if already true (for example, \"I live with peace and compassion\"). Ask me 3–5 short questions about what matters most to me, then help me distil a single, simple, positively-phrased sentence I can affirm during practice.",
  },
  {
    key: 'intention',
    title: 'Intention',
    short: 'What you intend for your practice, right now.',
    description: [
      'An Intention is a simple statement of what you are here to do — for this practice or this chapter of your life. It orients the mind like setting a compass before a walk.',
      'Keep it specific and present-tense — for example, “I stay present with whatever arises.” Hold it lightly at the start of each session.',
    ],
    placeholder: 'e.g. I stay present with whatever arises.',
    aiPrompt:
      "I'm practising iRest meditation and want to set an Intention — a specific, present-tense statement of what I intend for my practice or a current chapter of my life (for example, \"I stay present with whatever arises\"). Ask me 2–3 short questions, then help me phrase one clear, simple intention I can silently affirm at the start of each session.",
  },
  {
    key: 'innerResource',
    title: 'Inner Resource',
    short: 'An inner place of safety, ease, and well-being.',
    description: [
      'Your Inner Resource is an inner experience of security and ease that stays available whatever is happening around you. It is one of the most practical tools in iRest.',
      'Build it from a place, memory, or felt sense where you feel completely safe and at ease. Note the sights, sounds, and body-feelings that bring calm, so you can call it up in a few breaths — in practice and in daily life.',
    ],
    placeholder:
      'e.g. A quiet beach at dawn — warm sand, soft waves, a slow steady breath, a feeling of spaciousness in my chest.',
    aiPrompt:
      "I'm practising iRest meditation and want to build my Inner Resource — an inner place or felt sense of safety, ease, and well-being I can return to any time. Ask me about places, memories, or sensations where I feel completely safe and at ease, then help me write a short description I can call to mind, including the sights, sounds, and body-feelings that evoke calm.",
  },
]
