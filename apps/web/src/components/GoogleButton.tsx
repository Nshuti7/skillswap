import type { MouseEvent } from 'react'
import { API_BASE } from '../config/api'
import google from '../assets/icon-google.svg'
import './Button.css'

type Props = {
  /** "Continue with Google", "Sign up with Google" - the page sets the verb. */
  children: string
  /** Called before the browser leaves. preventDefault() to hold it back. */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Starts Google sign-in.
 *
 * It is a link rather than a control that fetches, and that is the whole
 * design. SkillSwap authenticates with a cookie session held in Redis, so the
 * browser has to leave the SPA, come back through the API's callback, and
 * arrive with Set-Cookie already applied. fetch() cannot do that: it will not
 * follow a redirect to accounts.google.com, and an ID token handled in JS
 * would have to be stored somewhere, which is the thing cookie sessions exist
 * to avoid. onClick is for guarding the navigation, not for performing it.
 *
 * The endpoint does not exist yet. Backend contract is on SS-29.
 */
export function GoogleButton({ children, onClick }: Props) {
  return (
    <a
      className="btn btn--secondary btn--google"
      href={`${API_BASE}/auth/google`}
      onClick={onClick}
    >
      <img src={google} alt="" width={18} height={18} />
      <span>{children}</span>
    </a>
  )
}
