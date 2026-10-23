import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function Placeholder({ title }: { title: string }) {
  return <h1 style={{ fontFamily: 'var(--font-brand)', fontWeight: 400 }}>{title}</h1>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth screens sit outside the shell: no sidebar, no top bar. */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Linked from Log in and not designed yet. It has to be routed here
            rather than falling through to the shell, which would put a
            sidebar and a signed-in top bar in front of a signed-out user. */}
        <Route path="/forgot-password" element={<Placeholder title="Forgot password" />} />

        <Route
          path="*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/find" element={<Placeholder title="Find Skills" />} />
                <Route path="/swaps" element={<Placeholder title="My Swaps" />} />
                <Route path="/messages" element={<Placeholder title="Messages" />} />
                <Route path="/reviews" element={<Placeholder title="Reviews" />} />
                <Route path="/history" element={<Placeholder title="History" />} />
                <Route path="/help" element={<Placeholder title="Help" />} />
                <Route path="/settings" element={<Placeholder title="Settings" />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
