const BEST_KEY = 'chidiya-udd-best'
const MUTE_KEY = 'chidiya-udd-muted'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // private mode — keep the session going without persistence
  }
}

export function getBest(): number {
  const raw = read(BEST_KEY)
  const n = raw ? Number.parseInt(raw, 10) : 0
  return Number.isFinite(n) ? n : 0
}

export function setBest(score: number): number {
  const next = Math.max(getBest(), score)
  write(BEST_KEY, String(next))
  return next
}

export function getMuted(): boolean {
  return read(MUTE_KEY) === '1'
}

export function setMuted(muted: boolean): void {
  write(MUTE_KEY, muted ? '1' : '0')
}
