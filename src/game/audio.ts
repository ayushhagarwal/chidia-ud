let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  return ctx
}

export function unlockAudio(): void {
  const c = getCtx()
  if (c && c.state === 'suspended') {
    void c.resume()
  }
}

function beep(
  muted: boolean,
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gain = 0.07,
  slideTo?: number,
) {
  if (muted) return
  const c = getCtx()
  if (!c) return
  if (c.state === 'suspended') void c.resume()

  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime)
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + duration)
  }
  g.gain.setValueAtTime(gain, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(g)
  g.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

export function playRaise(muted: boolean): void {
  beep(muted, 540, 0.07, 'triangle', 0.05)
}

export function playCorrect(muted: boolean): void {
  beep(muted, 620, 0.09, 'sine', 0.05)
  window.setTimeout(() => beep(muted, 820, 0.1, 'sine', 0.04), 70)
}

export function playWrong(muted: boolean): void {
  beep(muted, 280, 0.22, 'sawtooth', 0.045, 90)
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
