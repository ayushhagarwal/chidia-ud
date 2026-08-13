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
      if (tag === 'BUTTON' || tag === 'A') return
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

      {screen === 'home' && (
        <a
          className="github-link"
          href="https://github.com/ayushhagarwal/chidia-ud"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
            />
          </svg>
          GitHub
        </a>
      )}
    </div>
  )
}
