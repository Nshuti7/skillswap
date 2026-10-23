import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import './TextField.css'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  hint?: string
  error?: string
  /** Rendered inside the field, before the text. */
  icon?: ReactNode
  /** Rendered inside the field, after the text. Use for show/hide toggles. */
  trailing?: ReactNode
}

export function TextField({ label, hint, error, icon, trailing, ...input }: Props) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <div className={`field__box${error ? ' field__box--error' : ''}`}>
        {icon && <span className="field__icon">{icon}</span>}
        <input
          {...input}
          id={id}
          className="field__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
        />
        {trailing && <span className="field__trailing">{trailing}</span>}
      </div>

      {/* The error replaces the hint rather than stacking, so the field never
          changes height and the form does not jump during validation. */}
      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
