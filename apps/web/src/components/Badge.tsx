import './Badge.css'

type Tone = 'violet' | 'amber' | 'green' | 'slate'

export function Badge({ tone = 'slate', children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}
