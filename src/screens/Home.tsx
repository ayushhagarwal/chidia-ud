import { PaperCard } from '../components/PaperCard'
import './screens.css'

type HomeProps = {
  onStart: () => void
}

export function Home({ onStart }: HomeProps) {
  return (
    <PaperCard className="home-card">
      <p className="eyebrow">a garden game</p>
      <h1 className="title">
        Chidiya Udd
        <span className="bird-doodle" aria-hidden="true">
          <svg viewBox="0 0 40 24" width="40" height="24">
            <path
              d="M4 16c6-2 10-8 12-13 4 3 10 4 18 1-3 5-4 10-2 15-6-1-12 0-17 4-2-3-5-5-11-7z"
              fill="#2c2418"
            />
            <circle cx="28" cy="6" r="1.4" fill="#f4e6c6" />
          </svg>
        </span>
      </h1>
      <p className="lede">Raise your finger only if it can fly.</p>
      <button type="button" className="ink-btn" onClick={onStart}>
        Play
      </button>
    </PaperCard>
  )
}
