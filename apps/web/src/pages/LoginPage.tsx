import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthAside } from '../components/AuthAside'
import { Button } from '../components/Button'
import { GoogleButton } from '../components/GoogleButton'
import { TextField } from '../components/TextField'
import arrowRight from '../assets/icon-arrow-right.svg'
import eye from '../assets/icon-eye.svg'
import lock from '../assets/icon-lock.svg'
import '../styles/auth.css'

type Errors = Partial<Record<'email' | 'password', string>>

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  // Mirrors loginSchema in apps/api/src/modules/identity/identity.schemas.ts,
  // which asks only that the password be non-empty. Login deliberately does
  // not repeat the register rules: telling someone their stored password is
  // "too short" to even attempt is noise, and it leaks the rule to whoever
  // is typing.
  function validate(): Errors {
    const next: Errors = {}
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    if (password.length === 0) next.password = 'Enter your password.'
    return next
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    // TODO(SS-5): POST /api/v1/auth/login with credentials: 'include'.
    // Blocked on SS-15; there is no database to log in against yet.
  }

  return (
    <main className="auth">
      <AuthAside />

      <section className="auth__panel">
        <div className="auth__form-wrap">
          <p className="auth__welcome">Good to see you again</p>
          <h1 className="auth__title auth__title--lede">Log in to SkillSwap</h1>
          <p className="auth__lede">
            Continue learning, teaching and meeting your people.
          </p>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
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

            <div className="auth__stack">
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
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
              <a className="auth__forgot" href="/forgot-password">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              trailing={<img src={arrowRight} alt="" width={24} height={24} />}
            >
              Log in
            </Button>
          </form>

          <p className="auth__or">or</p>

          <GoogleButton>Continue with Google</GoogleButton>

          <p className="auth__alt">
            New to SkillSwap? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
