import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import './Checkbox.css'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> & {
  label: ReactNode
  error?: string
}

export function Checkbox({ label, error, ...input }: Props) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="checkbox">
      <div className="checkbox__row">
        <input
          {...input}
          type="checkbox"
          id={id}
          className="checkbox__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <label className="checkbox__label" htmlFor={id}>
          {label}
        </label>
      </div>
      {error && (
        <p className="checkbox__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
