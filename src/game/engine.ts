import { WORDS, type Word } from './words'

const START_MS = 1400
const MIN_MS = 700
const PER_SCORE_MS = 42
const TRICK_BONUS_MS = 160

export function pickWord(recentIds: string[] = []): Word {
  const pool = WORDS.filter((w) => !recentIds.includes(w.id))
  const source = pool.length > 0 ? pool : WORDS
  return source[Math.floor(Math.random() * source.length)]
}

export function roundDurationMs(score: number, trick = false): number {
  const base = Math.max(MIN_MS, START_MS - score * PER_SCORE_MS)
  return trick ? base + TRICK_BONUS_MS : base
}

export function isCorrect(word: Word, raised: boolean): boolean {
  return word.flies === raised
}
