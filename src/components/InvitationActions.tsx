import { invitation as invite } from '../data/invitation'
import { Arrow } from './Ornaments'

const address = invite.address.join(', ')
const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address)
const calendarLabels = [invite.events[0].title, 'Vratham', 'Lunch']
const share = [
  invite.title, invite.familyDisplay, invite.hosts.join(' & '), '',
  ...invite.events.map(event => event.title + ' · ' + event.display),
  'All times in Hyderabad (' + invite.timezone + ')', '', address, invite.venue.landmark,
  'Contact ' + invite.contactPhone,
  ...(import.meta.env.VITE_SITE_URL ? [import.meta.env.VITE_SITE_URL] : []),
].join('\n')
export const whatsapp = 'https://wa.me/?text=' + encodeURIComponent(share)

export function InvitationActions() {
  return <div className="invitation-actions">
    <div className="action-row">
      <a href={map} target="_blank" rel="noopener noreferrer">Search on Maps <Arrow diagonal /></a>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a>
      <a href={invite.phoneHref} aria-label={'Call family at ' + invite.contactPhone}>{invite.contactPhone}</a>
    </div>
    <div className="calendars"><span>Add to calendar</span><div>
      {invite.events.map((event, i) => <a key={event.title}
        aria-label={'Download calendar event for ' + event.title}
        href={import.meta.env.BASE_URL + 'calendar/' + event.title.toLowerCase().replaceAll(' ', '-') + '.ics'}
        download>{calendarLabels[i]}</a>)}
    </div></div>
  </div>
}

export function VenueAddress() {
  return <address><strong>{invite.venue.name}</strong>
    {invite.address.slice(1).map(line => <span key={line}>{line}</span>)}
    <span>{invite.venue.landmark}</span>
  </address>
}
