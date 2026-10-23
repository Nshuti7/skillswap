// Light-on-dark lockup, taken from the Background1 frame in Figma. The default
// logo.png is drawn for light surfaces and goes muddy on the navy panel.
import logo from '../assets/logo-light.png'

/**
 * The dark half of the split auth layout. Register and Log in draw it from
 * the same frame in Figma, down to the copy, so it lives here rather than
 * being pasted into each page.
 *
 * The pitch is marketing, not the heading of the page, and it is the same
 * sentence on every auth screen. It is a paragraph that happens to be set
 * large, so each page's own title can be the h1 and say which page it is.
 */
export function AuthAside() {
  return (
    <section className="auth__aside">
      <img className="auth__logo" src={logo} alt="SkillSwap" />
      <div className="auth__pitch">
        <p className="auth__eyebrow">Learn together</p>
        <p className="auth__headline">
          What you know can open a door for someone else.
        </p>
        <p className="auth__sub">
          Exchange practical skills with students around you. No fees, no pressure,
          just people helping people grow.
        </p>
      </div>
    </section>
  )
}
