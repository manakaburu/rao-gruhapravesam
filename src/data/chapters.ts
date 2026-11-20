import registry from '../../docs/SCENE_REGISTRY.json'
import { invitation } from './invitation'

export type ChapterId = 'entrance' | 'welcome' | 'blessings' | 'ceremonies' | 'feast' | 'closing'
type VerseKey = keyof typeof invitation.verse

// V11: the runway is ~6.4 stage-heights long (see CinematicStage), so every
// chapter costs roughly one screen of scrolling on any device. Each of the five
// reversible watercolor reveals spans 11.5% of the runway and every chapter
// then holds still for 7.5% so its text can be read before the next wash.
export const STORY_BEATS: Record<ChapterId, [number, number]> = {
  entrance: [0, .045],
  welcome: [.16, .235],
  blessings: [.35, .425],
  ceremonies: [.54, .615],
  feast: [.73, .805],
  closing: [.92, 1],
}
/** Scroll runway length as a multiple of the visible stage height, with limits. */
export const RUNWAY = { perStage: 6.4, min: 3200, max: 6000, shortStage: 460 } as const
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
