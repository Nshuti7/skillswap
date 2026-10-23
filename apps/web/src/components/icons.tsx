/*
 * Icons traced from the Figma icon set on Page 1.
 *
 * They are inlined rather than imported as .svg files because the exported
 * artwork has colours baked in (#786EF6, #2E3A56, white), and the two-tone
 * treatment disappears against the dark sidebar. Inlining lets `currentColor`
 * follow the surface the icon sits on.
 */

type Props = { size?: number; className?: string }

const base = (size: number) => ({
  width: size,
  height: size,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
})

export function IconDashboard({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 20.24 23.27" width={size} height={size} className={className} aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M7.3 12.27c1.54 0 2.46 1.39 2.46 2.67v5.66c0 1.28-.92 2.67-2.46 2.67H2.46C.92 23.27 0 21.88 0 20.6v-5.66c0-1.28.92-2.67 2.46-2.67H7.3Zm10.48 0c1.54 0 2.46 1.39 2.46 2.67v5.66c0 1.28-.92 2.67-2.46 2.67h-4.84c-1.54 0-2.46-1.39-2.46-2.67v-5.66c0-1.28.92-2.67 2.46-2.67h4.84ZM2.54 14.77a.63.63 0 0 0-.04.17v5.66c0 .08.02.14.04.17h4.67a.6.6 0 0 0 .04-.17v-5.66a.62.62 0 0 0-.04-.17H2.54Zm10.48 0a.63.63 0 0 0-.04.17v5.66c0 .08.02.14.04.17h4.68a.6.6 0 0 0 .04-.17v-5.66a.62.62 0 0 0-.04-.17h-4.68ZM7.3 0c1.53 0 2.46 1.39 2.46 2.67v5.66c0 1.28-.92 2.67-2.46 2.67H2.46C.92 11 0 9.61 0 8.33V2.67C0 1.39.92 0 2.46 0H7.3Zm10.48 0c1.54 0 2.46 1.39 2.46 2.67v5.66c0 1.28-.92 2.67-2.46 2.67h-4.84c-1.54 0-2.46-1.39-2.46-2.67V2.67C10.48 1.39 11.41 0 12.94 0h4.84ZM2.54 2.5a.64.64 0 0 0-.04.17v5.66c0 .08.02.14.04.17h4.67a.6.6 0 0 0 .04-.17V2.67a.62.62 0 0 0-.04-.17H2.54Zm10.48 0a.64.64 0 0 0-.04.17v5.66c0 .08.02.14.04.17h4.68a.6.6 0 0 0 .04-.17V2.67a.62.62 0 0 0-.04-.17h-4.68Z"
      />
    </svg>
  )
}

export function IconSearch({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <circle cx="10.06" cy="10.06" r="5.03" />
      <path d="M14.02 14.02 18.69 18.69" />
    </svg>
  )
}

export function IconSwap({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <path d="M3.59 7.91h14.38l-2.88-2.88" />
      <path d="M19.41 15.09H5.03l2.88 2.88" />
    </svg>
  )
}

export function IconMessage({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <path d="M3.59 5.03h15.82v10.78h-9.34l-4.32 3.6v-3.6H3.59V5.03Z" />
      <path d="M7.19 9.7h8.62M7.19 12.58h5.75" />
    </svg>
  )
}

export function IconStar({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <path d="m11.5 2.88 2.66 5.39 5.97.86-4.32 4.2 1.01 5.93-5.32-2.8-5.32 2.8 1.01-5.93-4.31-4.2 5.96-.86L11.5 2.88Z" />
    </svg>
  )
}

export function IconHistory({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <path d="M4.31 11.14a7.33 7.33 0 1 0 2.16-5.03" />
      <path d="M4.31 4.67v4.31h4.32M11.5 7.19v4.67l3.23 2.16" />
    </svg>
  )
}

export function IconHelp({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <circle cx="11.5" cy="11.5" r="8.27" />
      <path d="M8.98 8.98a2.52 2.52 0 1 1 3.96 2.16c-1.44 1.08-1.44 1.8-1.44 2.88M11.5 16.89h.004" />
    </svg>
  )
}

export function IconSettings({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <circle cx="11.5" cy="11.5" r="2.88" />
      <path d="M18.4 14.38a1.58 1.58 0 0 0 .32 1.74l.06.06a1.92 1.92 0 1 1-2.72 2.72l-.06-.06a1.59 1.59 0 0 0-1.74-.32 1.58 1.58 0 0 0-.96 1.45v.17a1.92 1.92 0 1 1-3.84 0v-.09a1.58 1.58 0 0 0-1.03-1.45 1.58 1.58 0 0 0-1.74.32l-.06.06a1.92 1.92 0 1 1-2.72-2.72l.06-.06a1.59 1.59 0 0 0 .32-1.74 1.58 1.58 0 0 0-1.45-.96h-.17a1.92 1.92 0 1 1 0-3.84h.09a1.58 1.58 0 0 0 1.45-1.03 1.58 1.58 0 0 0-.32-1.74l-.06-.06a1.92 1.92 0 1 1 2.72-2.72l.06.06a1.58 1.58 0 0 0 1.74.32h.08a1.58 1.58 0 0 0 .96-1.45v-.17a1.92 1.92 0 1 1 3.84 0v.09a1.58 1.58 0 0 0 .96 1.45 1.59 1.59 0 0 0 1.74-.32l.06-.06a1.92 1.92 0 1 1 2.72 2.72l-.06.06a1.58 1.58 0 0 0-.32 1.74v.08a1.58 1.58 0 0 0 1.45.96h.17a1.92 1.92 0 1 1 0 3.84h-.09a1.58 1.58 0 0 0-1.45.96Z" />
    </svg>
  )
}

export function IconPlus({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <path d="M11.5 5.03v12.94M5.03 11.5h12.94" />
    </svg>
  )
}

export function IconCheck({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <path d="m5.03 11.86 4.67 4.67 8.27-10.06" />
    </svg>
  )
}

export function IconPeople({ size = 20, className }: Props) {
  return (
    <svg viewBox="0 0 23 23" className={className} {...base(size)}>
      <circle cx="9.34" cy="7.19" r="3.24" />
      <path d="M2.88 19.41a6.47 6.47 0 0 1 12.94 0" />
      <path d="M16.17 4.31a3.24 3.24 0 0 1 0 5.75M18.33 13.3a6.48 6.48 0 0 1 3.8 5.9" />
    </svg>
  )
}
