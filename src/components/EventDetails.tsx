import { invitation as invite } from '../data/invitation'
import { CeremonyList } from './ChapterSpread'
import { InvitationActions, VenueAddress } from './InvitationActions'

export function EventDetails() {
  return <><section className="event-details" id="event-details" tabIndex={-1} aria-labelledby="details-title">
    <div className="details-inner"><h2 id="details-title">Event <em>details</em></h2>
      <p className="blessings">With the blessings of {invite.blessings}, {invite.hosts.join(' & ')} invite you to their Gruhapravesam.</p>
      <div className="details-columns"><div><p className="section-label">Ceremonies</p>
        <p className="time-zone">All times in Hyderabad · {invite.timezone}</p><CeremonyList summary /></div>
        <div className="venue"><h3 className="section-label">Venue &amp; directions</h3><VenueAddress />
          <InvitationActions /></div>
      </div>
    </div></section><footer className="colophon"><span>With best compliments from near and dear</span>
      <strong>{invite.familyDisplay}</strong></footer></>
}
