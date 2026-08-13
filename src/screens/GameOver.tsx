import { PaperCard } from '../components/PaperCard'
import './screens.css'

type GameOverProps = {
  score: number
  best: number
  shout: string
  nameEn: string
  raised: boolean
  flies: boolean
  onAgain: () => void
  onHome: () => void
}

function InkX() {
  return (
    <svg className="ink-x" viewBox="0 0 120 70" aria-hidden="true">
      <path
        d="M10 12 C 38 24 72 44 110 58"
        fill="none"
        stroke="#7a2838"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M108 10 C 74 28 46 42 12 60"
        fill="none"
        stroke="#7a2838"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function GameOver({
  score,
  best,
  shout,
  nameEn,
  raised,
  flies,
  onAgain,
  onHome,
}: GameOverProps) {
  const isBest = score > 0 && score >= best
  const label = nameEn.charAt(0).toUpperCase() + nameEn.slice(1)
  const note = flies ? `${label} flies.` : `${label} cannot fly.`
  const advice = raised ? 'You raised — sit still next time.' : 'You sat still — should have gone up.'

  return (
    <PaperCard className="result-card">
      <div className="out-stamp" aria-hidden="true">
        <span>OUT</span>
      </div>
      <p className="eyebrow">the last call</p>
      <p className="result-shout">
        {shout}!
        <InkX />
      </p>
      <p className="lede result-note">{note}</p>
      <p className="hint">{advice}</p>
      <p className="score-line">
        <span className="score-num">{score}</span>
        <span className="score-label">{score === 1 ? 'round' : 'rounds'}</span>
      </p>
      {isBest ? (
        <p className="result-best">new best under the tree</p>
      ) : (
        <p className="hint">best {best}</p>
      )}
      <button type="button" className="ink-btn" onClick={onAgain}>
        Play again
      </button>
      <button type="button" className="ink-btn ink-btn--ghost" onClick={onHome}>
        Back home
      </button>
    </PaperCard>
  )
}
