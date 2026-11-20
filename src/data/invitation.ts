import lock from '../../docs/CONTENT_LOCK.json'

const [title] = lock.pageTitle.split(' | ')
const [ceremony, festival] = title.split(' ')
const [telugu, transliteration] = lock.invocation.split(' • ')
const { venue, events } = lock
const dates = events.map(event => new Date(event.localDate + 'T12:00:00Z'))
const dateRange = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: lock.timezone,
}).formatRange(dates[0], dates[dates.length - 1])

export const invitation = {
  ...lock, title, ceremony, festival, dateRange,
  invocationParts: { telugu, transliteration },
  shortLocation: [venue.street.split(', ').at(-1), venue.city].join(', '),
  address: [venue.name, venue.flat, venue.street,
    `${venue.city}, ${venue.state} ${venue.postalCode}`, venue.country],
  phoneHref: 'tel:' + lock.contactPhone.replaceAll(' ', ''),
  verse: lock.editorialDraftsNotSourceFacts,
}
