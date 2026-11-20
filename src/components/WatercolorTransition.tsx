import { useState } from 'react'
import type { Chapter } from '../data/chapters'

export function ChapterArt({ chapter, ready }: { chapter: Chapter; ready: boolean }) {
  const [fallback, setFallback] = useState(false)
  const [failed, setFailed] = useState(false)
  const base = import.meta.env.BASE_URL
  return <div className={'plate plate--' + chapter.id}><div className="painting">
    {ready && !failed && <picture>
      {!fallback && <source type="image/webp" srcSet={base + chapter.webp} />}
      <img src={base + chapter.fallback} alt={chapter.alt} width="1448" height="1086"
        fetchPriority={chapter.id === 'entrance' ? 'high' : 'auto'}
        onError={() => fallback ? setFailed(true) : setFallback(true)} />
    </picture>}
    {failed && chapter.alt && <span className="art-description">{chapter.alt}</span>}
  </div></div>
}



// Visual-only title glimpse over the ORIGINAL soft watercolor wash.
// The entire incoming spread is masked by watercolor-mask.png in CSS.
// No char ring, burned edge, or additional scrolling timeline.
export function WatercolorTransition() {
  return <div className="watercolor-veil" aria-hidden="true" data-testid="watercolor-chapter-reveal" hidden>
    <div className="chapter-portal__caption"><span className="chapter-portal__title" /></div>
  </div>
}
