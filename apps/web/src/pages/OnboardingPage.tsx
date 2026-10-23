import { useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { IconCheck, IconPlus, IconSearch } from '../components/icons'
import mark from '../assets/logo-mark.png'
import '../styles/onboarding.css'

type Step = 'teach' | 'learn'

const STEPS: Record<Step, { title: string; lede: string; minimum: number }> = {
  teach: {
    title: 'What could you teach?',
    lede: 'Your everyday skills are valuable. Pick at least one so the right people can find you.',
    minimum: 1,
  },
  learn: {
    title: 'What would you love to learn?',
    lede: 'Choose a few interests and we will shape your marketplace around them.',
    minimum: 1,
  },
}

const ORDER: Step[] = ['teach', 'learn']

/*
 * The six tiles each step opens with, straight from the Figma frames. They
 * are a starting point, not the catalogue: the search box says "50+ skills"
 * and searching looks across everything below.
 *
 * TODO(SS-31): the real list belongs to the API. There is no skills endpoint
 * yet, and the matching module still answers 501.
 */
const SUGGESTED: Record<Step, string[]> = {
  teach: [
    'Web Development',
    'Graphic Design',
    'Excel',
    'Video editing',
    'Public Speaking',
    'Photography',
  ],
  learn: [
    'Digital marketing',
    'UI/UX design',
    'Data analysis',
    'Entrepreneurship',
    'French',
    'Guitar',
  ],
}

const CATALOGUE = [...new Set([...SUGGESTED.teach, ...SUGGESTED.learn])]

function isStep(value: string | undefined): value is Step {
  return value === 'teach' || value === 'learn'
}

export function OnboardingPage() {
  const { step } = useParams()
  const navigate = useNavigate()

  // Both steps are the same route component, so changing :step keeps this
  // mounted and the picks made on the first screen survive into the second.
  const [picked, setPicked] = useState<Record<Step, string[]>>({ teach: [], learn: [] })
  const [added, setAdded] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const search = useRef<HTMLInputElement>(null)

  const catalogue = useMemo(() => [...CATALOGUE, ...added], [added])

  if (!isStep(step)) return <Navigate to="/onboarding/teach" replace />

  // Bound once here: the guard above narrows `step` in the body, but not
  // inside the handlers below, which are hoisted function declarations.
  const active: Step = step

  const { title, lede, minimum } = STEPS[active]
  const selected = picked[active]
  const trimmed = query.trim()

  // With an empty box the step shows its own six. Searching looks wider,
  // which is the only way the "50+ skills" promise can hold.
  const shown = trimmed
    ? catalogue.filter((skill) => skill.toLowerCase().includes(trimmed.toLowerCase()))
    : [...SUGGESTED[active], ...added]

  const isNew =
    trimmed.length > 0 &&
    !catalogue.some((skill) => skill.toLowerCase() === trimmed.toLowerCase())

  const position = ORDER.indexOf(active)
  // Three segments in the design for two questions: the last one fills while
  // the picks are being saved.
  const progress = saving ? 100 : Math.round(((position + 1) / (ORDER.length + 1)) * 100)

  function toggle(skill: string) {
    setPicked((previous) => {
      const current = previous[active]
      return {
        ...previous,
        [active]: current.includes(skill)
          ? current.filter((s) => s !== skill)
          : [...current, skill],
      }
    })
  }

  // With something typed this adds it. With an empty box there is nothing to
  // add yet, so it sends the cursor where the name has to be typed rather
  // than sitting there greyed out.
  function addFromSearch() {
    if (!isNew) {
      search.current?.focus()
      return
    }
    setAdded((previous) => [...previous, trimmed])
    toggle(trimmed)
    setQuery('')
  }

  async function handleContinue() {
    const next = ORDER[position + 1]
    if (next) {
      setQuery('')
      navigate(`/onboarding/${next}`)
      return
    }

    setSaving(true)
    // TODO(SS-31): PUT the two lists with credentials: 'include'. There is no
    // endpoint yet, so this resolves straight away and the saving state only
    // flashes. The markup is here so the state exists once the call does.
    try {
      navigate('/dashboard')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="onboarding">
      <main className="onboarding__card">
        <div className="onboarding__progress">
          <div className="onboarding__progress-row">
            <p className="onboarding__progress-label">Set up your profile</p>
            {/* The frames all read "1 of 30" while the bar fills in thirds.
                Treated as a typo for the real count. */}
            <p className="onboarding__progress-count">
              Step {position + 1} of {ORDER.length}
            </p>
          </div>
          <div
            className="onboarding__track"
            role="progressbar"
            aria-label="Profile setup"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="onboarding__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="onboarding__eyebrow">
          <img src={mark} alt="" width={30} height={34} />
          Make your profile discoverable
        </p>

        <h1 className="onboarding__title">{title}</h1>
        <p className="onboarding__lede">{lede}</p>

        <div className="onboarding__search">
          <IconSearch size={20} />
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 50+ skills"
            aria-label="Search skills"
          />
        </div>

        {saving ? (
          <ul className="onboarding__grid" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="onboarding__skeleton" />
            ))}
          </ul>
        ) : (
          <ul className="onboarding__grid">
            {shown.map((skill) => {
              const on = selected.includes(skill)
              return (
                <li key={skill}>
                  <button
                    type="button"
                    className={`tile${on ? ' tile--on' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggle(skill)}
                  >
                    <span className="tile__mark" aria-hidden>
                      {on ? <IconCheck size={18} /> : <IconPlus size={18} />}
                    </span>
                    <span>{skill}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {shown.length === 0 && !saving && (
          <p className="onboarding__empty">No skill matches “{trimmed}”.</p>
        )}

        <button type="button" className="onboarding__add" onClick={addFromSearch}>
          {isNew ? `+ Add “${trimmed}”` : '+ Add a skill that isn’t listed'}
        </button>

        <footer className="onboarding__foot">
          {/* Live, because selecting a tile is what changes it and the tile
              itself gives no count. */}
          <p className="onboarding__status" aria-live="polite">
            {selected.length < minimum
              ? `Choose at least ${minimum} skill to continue`
              : `${selected.length} skill${selected.length === 1 ? '' : 's'} selected`}
          </p>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={selected.length < minimum || saving}
          >
            {saving ? 'Saving…' : 'Continue'}
          </Button>
        </footer>
      </main>
    </div>
  )
}
