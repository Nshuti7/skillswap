import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import './AppShell.css'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <div className="shell__main">
        {/* Placeholder identity until /auth/me is wired. Needs SS-15. */}
        <TopBar name="Hussaina Dhrolia" role="Student member" />
        <main className="shell__content">{children}</main>
      </div>
    </div>
  )
}
