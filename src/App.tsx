import { useCallback, useEffect, useState } from 'react'
import { GardenScene } from './scene/GardenScene'
import { unlockAudio } from './game/audio'
import { getBest, getMuted, setBest, setMuted as persistMuted } from './game/storage'
import { GameOver } from './screens/GameOver'
import { Home } from './screens/Home'
import { Play, type GameOverPayload } from './screens/Play'
import './App.css'

type Screen = 'home' | 'play' | 'gameover'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [muted, setMuted] = useState(() => getMuted())
  const [best, setBestState] = useState(() => getBest())
  const [result, setResult] = useState<GameOverPayload | null>(null)
  const [playKey, setPlayKey] = useState(0)

  const start = useCallback(() => {
    unlockAudio()
    setResult(null)
    setPlayKey((k) => k + 1)
    setScreen('play')
  }, [])

  const end = useCallback((payload: GameOverPayload) => {
    const nextBest = setBest(payload.score)
    setBestState(nextBest)
    setResult(payload)
    setScreen('gameover')
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      persistMuted(next)
      return next
    })
  }, [])

  useEffect(() => {
    if (screen === 'play') return
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.code !== 'Space' && e.code !== 'Enter') return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'BUTTON') return
      e.preventDefault()
      if (screen === 'home' || screen === 'gameover') start()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [screen, start])

  return (
    <div className="app">
      <GardenScene />

      <header className="chrome-top">
        <button
          type="button"
          className="mute-btn"
          onClick={toggleMute}
          onPointerDown={(e) => e.stopPropagation()}
          aria-pressed={muted}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M4 10v4h3l4 3V7L7 10H4z"
                fill="currentColor"
              />
              <path
                d="M15.5 9.5l5 5M20.5 9.5l-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
              <path
                d="M16 9.5c1.2 1.1 1.2 3.9 0 5M18.4 7.5c2.2 2.2 2.2 6.8 0 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </header>

      <main className="stage">
        {screen === 'home' && <Home onStart={start} />}
        {screen === 'play' && <Play key={playKey} muted={muted} onGameOver={end} />}
        {screen === 'gameover' && result && (
          <GameOver
            score={result.score}
            best={best}
            shout={result.word.shout}
            nameEn={result.word.nameEn}
            raised={result.raised}
            flies={result.word.flies}
            onAgain={start}
            onHome={() => setScreen('home')}
          />
        )}
      </main>

      <footer className="chrome-bottom">
        <span className="brand-mark">Chidiya Udd</span>
      </footer>
    </div>
  )
}
