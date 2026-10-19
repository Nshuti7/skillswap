import { Badge } from '../components/Badge'
import './DashboardPage.css'

// Placeholder content. Every figure here comes from the Figma mockup and needs
// replacing with the dashboard aggregate endpoint, which is blocked on SS-15.
const attention = [
  {
    tone: 'violet' as const,
    badge: 'Pending request',
    title: 'Brice sent a swap request',
    body: 'You teach Web Development; Brice teaches Graphic Design.',
    action: 'Review request',
  },
  {
    tone: 'amber' as const,
    badge: '10 min ago',
    title: '1 unread message from Daniel',
    body: '“I’ve shared the dataset. Are we still on for 4:00 PM?”',
    action: 'Open message',
  },
  {
    tone: 'green' as const,
    badge: 'Rating pending',
    title: 'Session finished — rate Daniel',
    body: 'Python Basics ⇄ Data Analysis • completed yesterday.',
    action: 'Leave a review',
  },
]

const stats = [
  { value: '2', label: 'Active swaps' },
  { value: '1', label: 'Pending requests' },
  { value: '1', label: 'Unread messages' },
  { value: '12', label: 'Reviews received' },
]

const activity = [
  { badge: 'Message', text: 'Daniel sent: “I added the Python notes to our session.”', when: '10 min ago' },
  { badge: 'Swap request', text: 'Brice requested Web Development ⇄ Graphic Design.', when: '1 hour ago' },
  { badge: 'Completed session', text: 'Python Basics ⇄ Data Analysis with Daniel', when: 'Yesterday' },
  { badge: 'Review received', text: 'Jaliya rated your Figma mentoring session 5 stars.', when: '2 days ago' },
]

export function DashboardPage() {
  return (
    <div className="dash">
      <header className="dash__head">
        <h1>Good morning, Hussaina</h1>
        <p>Here’s what needs your attention today.</p>
      </header>

      <section className="dash__attention" aria-label="Needs your attention">
        {attention.map((card) => (
          <article key={card.title} className={`acard acard--${card.tone}`}>
            <Badge tone={card.tone}>{card.badge}</Badge>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
            <button type="button" className="acard__action">
              {card.action}
            </button>
          </article>
        ))}
      </section>

      <section className="session" aria-label="Active session">
        <div className="session__summary">
          <div className="session__status">
            <Badge tone="green">In progress</Badge>
            <span className="session__meta">Today • 2:00–3:00 PM • Online</span>
          </div>
          <h2>Web Development ⇄ Graphic Design</h2>
          <p className="session__meta">With Brian • React basics and Figma foundations</p>
        </div>
        <button type="button" className="session__join">
          Join session
        </button>
      </section>

      <section className="dash__stats" aria-label="Quick stats">
        {stats.map((s) => (
          <article key={s.label} className="stat">
            <p className="stat__value">{s.value}</p>
            <p className="stat__label">{s.label}</p>
          </article>
        ))}
      </section>

      <section className="dash__activity" aria-label="Recent activity">
        <div className="dash__section-head">
          <h2>Recent activity</h2>
          <a href="/history">View all</a>
        </div>
        <ul className="activity">
          {activity.map((row) => (
            <li key={row.text} className="activity__row">
              <Badge>{row.badge}</Badge>
              <p className="activity__text">{row.text}</p>
              <span className="activity__when">{row.when}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
