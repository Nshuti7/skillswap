import { IconSearch } from './icons'
import avatar from '../assets/avatar.png'
import './TopBar.css'

export function TopBar({ name, role }: { name: string; role: string }) {
  return (
    <header className="topbar">
      <div className="topbar__search">
        <IconSearch size={18} />
        <input
          type="search"
          placeholder="Search skills, people, or topics…"
          aria-label="Search skills, people, or topics"
        />
      </div>

      <div className="topbar__user">
        <img className="topbar__avatar" src={avatar} alt="" width={40} height={40} />
        <div>
          <p className="topbar__name">{name}</p>
          <p className="topbar__role">{role}</p>
        </div>
      </div>
    </header>
  )
}
