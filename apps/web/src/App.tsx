import { SkillLevel } from '@skillswap/shared'
import './App.css'

function App() {
  return (
    <main className="app">
      <h1>SkillSwap</h1>
      <p className="tagline">Skills are the new currency.</p>

      <section>
        <h2>Skill levels</h2>
        <ul>
          {Object.values(SkillLevel).map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
