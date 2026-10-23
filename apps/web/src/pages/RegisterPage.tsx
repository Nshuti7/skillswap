import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { TextField } from '../components/TextField'
import arrowRight from '../assets/icon-arrow-right.svg'
import check from '../assets/icon-check.svg'
import eye from '../assets/icon-eye.svg'
import lock from '../assets/icon-lock.svg'
// Light-on-dark lockup, taken from the Background1 frame in Figma. The default
// logo.png is drawn for light surfaces and goes muddy on the navy panel.
import logo from '../assets/logo-light.png'
import './RegisterPage.css'

type Errors = Partial<Record<'name' | 'email' | 'password' | 'terms', string>>

// Mirrors registerSchema in apps/api/src/modules/identity/identity.schemas.ts.
// Server-side validation is still the authority; this only saves a round trip.
const MIN_PASSWORD = 8
const MAX_PASSWORD = 72

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  function validate(): Errors {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    if (password.length < MIN_PASSWORD) {
      next.password = `Use at least ${MIN_PASSWORD} characters.`
    } else if (password.length > MAX_PASSWORD) {
      next.password = `Use no more than ${MAX_PASSWORD} characters.`
    }
    if (!accepted) next.terms = 'Accept the terms to continue.'
    return next
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    // TODO(SS-5): POST /api/v1/auth/register with credentials: 'include'.
    // Blocked on SS-15; there is no database to register against yet.
  }

  return (
    <main className="auth">
      <section className="auth__aside">
        <img className="auth__logo" src={logo} alt="SkillSwap" />
        <div className="auth__pitch">
          <p className="auth__eyebrow">Learn together</p>
          <h1 className="auth__headline">
            What you know can open a door for someone else.
          </h1>
          <p className="auth__sub">
            Exchange practical skills with students around you. No fees, no pressure,
            just people helping people grow.
          </p>
        </div>
      </section>

      <section className="auth__panel">
        <div className="auth__form-wrap">
          <p className="auth__welcome">Welcome to SkillSwap</p>
          <h2 className="auth__title">Create your account</h2>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full name"
              name="name"
              autoComplete="name"
              placeholder="e.g. Batool Rawat"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              hint="At least 8 characters."
              icon={<img src={lock} alt="" width={20} height={20} />}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  <img src={eye} alt="" width={20} height={14} />
                </button>
              }
            />

            <Checkbox
              name="terms"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              error={errors.terms}
              label={
                <>
                  I agree to the <a href="/terms">Terms of Service</a> and{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </>
              }
            />

            <Button
              type="submit"
              trailing={<img src={arrowRight} alt="" width={24} height={24} />}
            >
              Create account
            </Button>
          </form>

          <p className="auth__trust">
            <img src={check} alt="" width={22} height={22} />
            Your details are protected and never shared.
          </p>

          <p className="auth__alt">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </section>
    </main>
  )
}
