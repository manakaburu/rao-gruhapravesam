import registry from '../../docs/SCENE_REGISTRY.json'
import { invitation } from './invitation'

export type ChapterId = 'entrance' | 'welcome' | 'blessings' | 'ceremonies' | 'feast' | 'closing'
type VerseKey = keyof typeof invitation.verse

// V6: first reveal begins after ~310 desktop pixels; five reversible ~806px
// full-stage watercolor transitions. Each other chapter holds ~310px to read.
export const STORY_BEATS: Record<ChapterId, [number, number]> = {
  entrance: [0, .05],
  welcome: [.18, .23],
  blessings: [.36, .41],
  ceremonies: [.54, .59],
  feast: [.72, .77],
  closing: [.90, 1],
}
const beats = STORY_BEATS
const alt: Record<ChapterId, string> = {
  entrance: 'Painted door of Flat 201 surrounded by peacocks, garlands, brass lamps and a white threshold muggu.',
  welcome: 'A sunlit sitting room with a sofa, peacock cushions, plants and hanging lamps.',
  blessings: 'Lord Venkateswara in an ornate flower-decorated shrine between two brass lamps.',
  ceremonies: 'A painted kalash, brass lamps and homam fire framed by flowers.',
  feast: 'A traditional festive meal arranged on a banana leaf.', closing: '',
}
export const chapters = registry.scenes.map(entry => {
  const id = entry.id as ChapterId
  const [start, end] = beats[id]
  return { id, name: entry.eyebrow, start, end, alt: alt[id],
    lines: invitation.verse[entry.teluguKey as VerseKey],
    webp: entry.assetWebp, fallback: entry.assetFallback }
})
export type Chapter = (typeof chapters)[number]
