import './Finger.css'

type FingerProps = {
  raised: boolean
  wrong: boolean
}

export function Finger({ raised, wrong }: FingerProps) {
  return (
    <div
      className={`finger ${raised ? 'finger--up' : ''} ${wrong ? 'finger--wrong' : ''}`.trim()}
      aria-hidden="true"
    >
      <svg viewBox="0 0 72 120" width="52" height="86">
        <ellipse cx="36" cy="112" rx="20" ry="6" fill="#2c1c10" opacity="0.22" />
        <path
          d="M22 112c-4-16-2-34 4-52 1-5 2-16 3-26 1-5 6-7 10-3 2 3 2 9 1 14 0 7-2 18-2 25 7-1 14 0 16 6 2 7-3 12-10 14 5 3 7 10 3 16-5 9-16 12-25 6z"
          fill="#e0b07a"
        />
        <path
          d="M32 38c1-9 2-18 3-24"
          fill="none"
          stroke="#c48a5a"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <ellipse cx="36" cy="16" rx="8" ry="9" fill="#e0b07a" />
        <path d="M30 14c2 3 8 3 11 0" fill="none" stroke="#c48a5a" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>
  )
}
