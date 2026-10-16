import { NavLink } from 'react-router-dom'
import {
  IconDashboard,
  IconHelp,
  IconHistory,
  IconMessage,
  IconSearch,
  IconSettings,
  IconStar,
  IconSwap,
} from './icons'
import logo from '../assets/logo-light.png'
import './Sidebar.css'

const primary = [
  { to: '/', label: 'Dashboard', Icon: IconDashboard, end: true },
  { to: '/find', label: 'Find Skills', Icon: IconSearch },
  { to: '/swaps', label: 'My Swaps', Icon: IconSwap },
  { to: '/messages', label: 'Messages', Icon: IconMessage },
  { to: '/reviews', label: 'Reviews', Icon: IconStar },
  { to: '/history', label: 'History', Icon: IconHistory },
]

const secondary = [
  { to: '/help', label: 'Help', Icon: IconHelp },
  { to: '/settings', label: 'Settings', Icon: IconSettings },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src={logo} alt="SkillSwap" />
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {primary.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="navrow">
            <span className="navrow__indicator" aria-hidden />
            <Icon size={20} className="navrow__icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__foot">
        <nav aria-label="Secondary">
          {secondary.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className="navrow">
              <span className="navrow__indicator" aria-hidden />
              <Icon size={20} className="navrow__icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__note">
          <p className="sidebar__note-title">SkillSwap</p>
          <p className="sidebar__note-body">
            Skills are the new Currency.
            <br />
            Learn from peers. Share what you know.
          </p>
        </div>
      </div>
    </aside>
  )
}
