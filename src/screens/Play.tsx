import { useCallback, useEffect, useRef, useState } from 'react'
import { Finger } from '../components/Finger'
import { PaperCard } from '../components/PaperCard'
import { playCorrect, playRaise, playWrong } from '../game/audio'
import { isCorrect, pickWord, roundDurationMs } from '../game/engine'
import type { Word } from '../game/words'
import './screens.css'

export type GameOverPayload = {
  score: number
  word: Word
  raised: boolean
}

type PlayProps = {
  muted: boolean
  onGameOver: (payload: GameOverPayload) => void
}

export function Play({ muted, onGameOver }: PlayProps) {
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [word, setWord] = useState<Word>(() => pickWord())
  const [progress, setProgress] = useState(1)
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none')
  const [fingerUp, setFingerUp] = useState(false)

  const judgedRef = useRef(false)
  const wordRef = useRef(word)
  const scoreRef = useRef(0)
  const mutedRef = useRef(muted)
  const recentRef = useRef<string[]>([])
  const durationRef = useRef(roundDurationMs(0, word.trick))
  const rafRef = useRef(0)
  const timeoutRef = useRef(0)
  const onGameOverRef = useRef(onGameOver)

  wordRef.current = word
  scoreRef.current = score
  mutedRef.current = muted
  onGameOverRef.current = onGameOver

  const finishRound = useCallback((raised: boolean) => {
    if (judgedRef.current) return
    judgedRef.current = true
    cancelAnimationFrame(rafRef.current)

    const current = wordRef.current
    const ok = isCorrect(current, raised)
    setFingerUp(raised)

    if (ok) {
      playCorrect(mutedRef.current)
      setFeedback('correct')
      const nextScore = scoreRef.current + 1
      timeoutRef.current = window.setTimeout(() => {
        recentRef.current = [...recentRef.current, current.id].slice(-8)
        const next = pickWord(recentRef.current)
        setScore(nextScore)
        setWord(next)
        setFeedback('none')
        setFingerUp(false)
        judgedRef.current = false
        durationRef.current = roundDurationMs(nextScore, next.trick)
        setProgress(1)
        setRound((r) => r + 1)
      }, 300)
      return
    }

    playWrong(mutedRef.current)
    setFeedback('wrong')
    timeoutRef.current = window.setTimeout(() => {
      onGameOverRef.current({
        score: scoreRef.current,
        word: current,
        raised,
      })
    }, 620)
  }, [])

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      if (judgedRef.current) return
      const elapsed = now - start
      const p = Math.max(0, 1 - elapsed / durationRef.current)
      setProgress(p)
      if (p <= 0) {
        finishRound(false)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [round, finishRound])

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current)
  }, [])

  const raise = useCallback(() => {
    if (judgedRef.current) return
    playRaise(mutedRef.current)
    setFingerUp(true)
    finishRound(true)
  }, [finishRound])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.code !== 'Space' && e.code !== 'Enter') return
      if ((e.target as HTMLElement | null)?.tagName === 'BUTTON') return
      e.preventDefault()
      raise()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [raise])

  return (
    <div
      className="play-layer"
      role="button"
      tabIndex={0}
      aria-label="Tap if it flies, stay still if it does not"
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        e.preventDefault()
        raise()
      }}
    >
      <div className="score-chip" aria-live="polite">
        {score}
      </div>
      <div className="play-hud">
        <PaperCard compact className={feedback === 'wrong' ? 'sign--marked' : ''}>
          <div className="shout-wrap">
            <h1
              className={`shout ${feedback === 'correct' ? 'shout--ok' : ''} ${feedback === 'wrong' ? 'shout--bad' : ''}`.trim()}
              aria-live="assertive"
            >
              {word.shout}!
            </h1>
            {feedback === 'wrong' && (
              <svg className="play-mark" viewBox="0 0 100 56" aria-hidden="true">
                <path
                  d="M18 12 L 82 44"
                  fill="none"
                  stroke="#7a2838"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M82 12 L 18 44"
                  fill="none"
                  stroke="#7a2838"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {feedback === 'correct' && (
              <svg className="play-mark" viewBox="0 0 100 56" aria-hidden="true">
                <path
                  d="M18 30 L 40 46 L 82 12"
                  fill="none"
                  stroke="#2a5a28"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="timer" aria-hidden="true">
            <div className="timer-fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </PaperCard>
        <p className="play-caption">tap if it flies</p>
        <Finger raised={fingerUp} wrong={feedback === 'wrong'} />
      </div>
    </div>
  )
}
