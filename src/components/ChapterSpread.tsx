import type { ReactNode } from 'react'
import { invitation as invite } from '../data/invitation'
import type { Chapter } from '../data/chapters'
import { TeluguVerse } from './TeluguVerse'
import { FloralRule } from './Ornaments'
import { ChapterArt } from './WatercolorTransition'
import { InvitationActions, VenueAddress } from './InvitationActions'
import { StoryOrnaments } from './StoryOrnaments'

const [housewarming, vratham, lunch] = invite.events
type Event = typeof housewarming

export function EventTime({ event }: { event: Event }) {
  return <time dateTime={event.localDate + 'T' + event.localTime + ':00+05:30'}>{event.display}</time>
}

function Heading({ chapter }: { chapter: Chapter }) {
  const names: Record<Chapter['id'], ReactNode> = {
    entrance: <>{invite.ceremony} <em>{invite.festival}</em></>,
    welcome: <>Cordially Inviting <em>You &amp; Your Family</em></>,
    blessings: <>Divine <em>Blessings</em></>,
    ceremonies: <>Auspicious <em>Ceremonies</em></>,
    feast: <>Vindu <em>Bhojanam</em></>,
    closing: <>Our New <em>Abode</em></>,
  }
  const Tag = chapter.id === 'entrance' ? 'h1' : 'h2'
  return <Tag id={'title-' + chapter.id}>{names[chapter.id]}</Tag>
}

export function CeremonyList({ summary = false }: { summary?: boolean }) {
  return <ol className="events">{(summary ? invite.events : [housewarming, vratham]).map(event => <li key={event.title}>
    <h3>{event.title}</h3><EventTime event={event} />
    <p>{event.rituals?.join(' · ') ?? event.description}</p>
  </li>)}</ol>
}

export function ChapterSpread({ chapter, ready }: { chapter: Chapter; ready: boolean }) {
  const { id } = chapter
  const art = <ChapterArt chapter={chapter} ready={ready} />
  return <section className={'spread spread--' + id} id={'chapter-' + id} tabIndex={-1} aria-labelledby={'title-' + id}>
    <StoryOrnaments scene={id} />
    {ready && (id === 'ceremonies' || id === 'feast') &&
      <img className="folio-corner" alt="" width="400" height="280"
        src={import.meta.env.BASE_URL + 'assets/foliage_' + (id === 'feast' ? 'left' : 'right') + '.png'} />}
    <div className="heading-block">
      {id === 'entrance' && <p className="invocation"><span lang="te">{invite.invocationParts.telugu}</span>
        <span className="invocation-dot"> • </span>{invite.invocationParts.transliteration}</p>}
      <Heading chapter={chapter} />
    </div>
    <div className="verse-block"><FloralRule /><TeluguVerse lines={chapter.lines} />
      {id === 'entrance' && <div className="imprint"><span>{invite.dateRange}</span><span>{invite.shortLocation}</span></div>}
      {id === 'welcome' && <div className="imprint"><span>{invite.hosts.join(' & ')}</span><span>{invite.familyDisplay}</span></div>}
      {id === 'blessings' && <p className="source-line">With the divine blessings of Lord Venkateswara and our beloved elders.</p>}
      {id === 'closing' && <p className="source-line">Your presence and blessings will make our new home complete.</p>}
      {id === 'ceremonies' && art}
    </div>
    {id === 'ceremonies' ? <div className="schedule-inset"><CeremonyList /></div> :
      id === 'feast' ? <div className="meal-inset"><div className="feast-reveal">{art}<div className="meal-flourish" aria-hidden="true"><span /><span /><span /><span /><span /></div></div>
        <p>{lunch.description}</p><EventTime event={lunch} /></div> :
      id === 'closing' ? <div className="closing-inset"><div className="address-print">{art}<VenueAddress /></div>
        <InvitationActions /></div> : art}
  </section>
}
