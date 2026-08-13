import type { ReactNode } from 'react'
import './PaperCard.css'

type PaperCardProps = {
  children: ReactNode
  className?: string
  compact?: boolean
}

export function PaperCard({
  children,
  className = '',
  compact = false,
}: PaperCardProps) {
  return (
    <div className={`sign ${compact ? 'sign--compact' : ''} ${className}`.trim()}>
      <div className="sign-inner">
        <svg className="sign-hang" viewBox="0 0 240 30" aria-hidden="true">
          <path
            d="M34 24 C 84 4 156 4 206 24"
            fill="none"
            stroke="#5a3d22"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="34" cy="24" r="5.5" fill="#c9a66a" stroke="#4a3218" strokeWidth="1.8" />
          <circle cx="34" cy="24" r="2" fill="#2c1c10" />
          <circle cx="206" cy="24" r="5.5" fill="#c9a66a" stroke="#4a3218" strokeWidth="1.8" />
          <circle cx="206" cy="24" r="2" fill="#2c1c10" />
        </svg>
        {children}
      </div>
    </div>
  )
}
