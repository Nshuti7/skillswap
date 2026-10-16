import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  trailing?: ReactNode
}

export function Button({ variant = 'primary', trailing, children, ...button }: Props) {
  return (
    <button {...button} className={`btn btn--${variant}`}>
      <span>{children}</span>
      {trailing && <span className="btn__trailing">{trailing}</span>}
    </button>
  )
}
