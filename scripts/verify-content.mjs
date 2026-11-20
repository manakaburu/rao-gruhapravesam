import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'
const lock=JSON.parse(await readFile(new URL('../docs/CONTENT_LOCK.json', import.meta.url),'utf8'))
assert.equal(lock.familyDisplay,"The Rao's Family")
assert.deepEqual(lock.hosts,['Sri Sana Rambabu','Smt. Bhavani'])
assert.equal(lock.timezone,'Asia/Kolkata')
assert.deepEqual(lock.events.map(({localDate,localTime})=>[localDate,localTime]),[['2026-11-25','20:48'],['2026-11-26','08:30'],['2026-11-26','12:30']])
assert.equal(lock.venue.flat,'Flat No: 201')
assert.equal(lock.contactPhone,'+91 9666571316')
const milkCeremony = 'పాలు పొంగించడం (Palu Ponginchadam — Auspicious Milk-Boiling Ceremony)'
assert(lock.events[0].rituals.includes(milkCeremony),'Exact bilingual ceremony label missing')
assert.deepEqual(lock.editorialDraftsNotSourceFacts.lunch,[
  'పూజల శుభవేళలో మీ రాక మాకు ఆనందం…',
  'విందు భోజనంతో మీతో గడపడం మాకు మరింత సంతోషం…',
  'ఆప్యాయంగా వచ్చి, ఆనందంగా భోజనం చేసి ఆశీర్వదించండి!'
])
assert.equal(lock.venue.mapUrlVerified,false)
for(const bad of ['RSVP','guestbook'])assert(lock.exclusions.includes(bad))
for(const key of ['entrance','welcome','blessings','ceremonies','lunch','closing'])assert(lock.editorialDraftsNotSourceFacts[key]?.length>0,key)
const expected={ 'gruhapravesam':'20261125T151800Z', 'satyanarayana-vratham':'20261126T030000Z', 'vindu-bhojanam':'20261126T070000Z'}
for (const [name,date] of Object.entries(expected)) {
  const s=await readFile(new URL('../public/calendar/'+name+'.ics',import.meta.url),'utf8')
  if (name === 'gruhapravesam') {
    const description = s.replace(/\r\n[ \t]/g, '').split('\r\n').find(line => line.startsWith('DESCRIPTION:'))
    assert(description?.includes(milkCeremony), 'Calendar and invitation ceremony names must match')
    assert(s.split('\r\n').every(line => Buffer.byteLength(line) <= 75), 'Calendar line exceeds 75 UTF-8 bytes')
  }
  assert(s.includes('DTSTART:'+date),name+' wrong UTC start')
  assert(!s.includes('DTEND:'),name+' invented event ending')
}
const reg=JSON.parse(await readFile(new URL('../docs/SCENE_REGISTRY.json', import.meta.url),'utf8'))
assert.equal(reg.scenes.length,6)
assert.deepEqual(reg.scenes.map(s=>s.id),['entrance','welcome','blessings','ceremonies','feast','closing'])
console.log('Locked content, scene registry, exclusions and all 3 zero-duration calendar starts verified')
