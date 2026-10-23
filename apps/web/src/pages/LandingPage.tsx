import { Link } from 'react-router-dom'
import { IconPeople, IconSwap } from '../components/icons'
import arrowRight from '../assets/icon-arrow-right.svg'
import check from '../assets/icon-check.svg'
import illustration from '../assets/illustration-swap.png'
import logo from '../assets/logo.png'
import '../styles/landing.css'

/**
 * The public front door, from the Auth/Landing frame in Figma (150:7).
 *
 * This is the only screen in the app that a signed-out stranger sees, so it
 * carries no sidebar and no top bar. Once sessions are wired up (SS-15) the
 * router should send an authenticated visitor straight to /dashboard instead
 * of rendering this.
 */
export function LandingPage() {
  return (
    <div className="landing">
      <header className="landing__bar">
        <img className="landing__logo" src={logo} alt="SkillSwap" />
        <nav className="landing__bar-nav" aria-label="Account">
          <Link className="landing__login" to="/login">
            Log in
          </Link>
          <Link className="btn btn--primary btn--inline" to="/register">
            Join SkillSwap
          </Link>
        </nav>
      </header>

      <main className="landing__hero">
        <div className="landing__copy">
          <h1 className="landing__title">
            Swap Skills.
            <br />
            Grow together.
          </h1>

          <p className="landing__lede">
            Turn what you know into what you want to learn. Meet students, share
            real skills and build your network along the way.
          </p>

          <div className="landing__actions">
            <Link className="btn btn--primary btn--inline" to="/register">
              <span>Start Swapping</span>
              <span className="btn__trailing">
                <img src={arrowRight} alt="" width={24} height={24} />
              </span>
            </Link>
            <Link className="btn btn--secondary btn--inline" to="/login">
              I have an account
            </Link>
          </div>

          <ul className="landing__trust">
            <li>
              <img src={check} alt="" width={22} height={22} />
              Verified IUEA students
            </li>
            <li>
              <IconPeople size={22} />
              Peer to peer learning
            </li>
          </ul>
        </div>

        {/* The two cards are the example swap the illustration is about, so
            they are one figure with it rather than three loose elements. */}
        <figure className="landing__art">
          <img
            className="landing__illustration"
            src={illustration}
            alt=""
            width={500}
            height={333}
          />

          <figcaption className="landing__cards">
            <p className="landing__card landing__card--teach">
              <span className="landing__card-icon" aria-hidden>
                {'</>'}
              </span>
              <span>
                <span className="landing__card-eyebrow">I can teach</span>
                <span className="landing__card-skill">Web development</span>
              </span>
            </p>

            <p className="landing__card landing__card--learn">
              <span className="landing__card-icon" aria-hidden>
                <IconSwap size={20} />
              </span>
              <span>
                <span className="landing__card-eyebrow">I want to learn</span>
                <span className="landing__card-skill">Mobile programming</span>
              </span>
            </p>
          </figcaption>
        </figure>
      </main>
    </div>
  )
}
