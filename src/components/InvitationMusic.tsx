import { useEffect, useRef, useState } from 'react'
import { invitation } from '../data/invitation'
import { FloralRule } from './Ornaments'

// Uploaded by the site owner for this invitation. Confirm distribution rights before public hosting.
const SELECTED_MUSIC = import.meta.env.BASE_URL + 'audio/achyutam-keshavam-user-upload.mp3'
const CHOICE_KEY = 'rao-invitation-music'
type Choice = 'on' | 'off' | null
type Gate = 'hidden' | 'open' | 'closing'

function readChoice(): Choice {
  try { const v = sessionStorage.getItem(CHOICE_KEY); return v === 'on' || v === 'off' ? v : null } catch { return null }
}
function saveChoice(choice: Exclude<Choice, null>) {
  try { sessionStorage.setItem(CHOICE_KEY, choice) } catch { /* private mode: choice lasts for this page only */ }
}

/**
 * Browsers only allow sound after a real tap/click/keypress on the page; a
 * scroll gesture never counts. Phones therefore always block the first
 * autoplay attempt. When that happens we show a short "Open invitation" cover
 * whose button *is* that tap, so the music starts reliably on iOS and Android.
 * Where autoplay is permitted the cover never appears.
 */
export function InvitationMusic() {
  const ref = useRef<HTMLAudioElement>(null)
  const api = useRef({ toggle: () => {}, open: (_music: boolean) => {} })
  const openButton = useRef<HTMLButtonElement>(null)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState('')
  const [gate, setGate] = useState<Gate>('hidden')

  useEffect(() => {
    const sound = ref.current!
    let choice = readChoice()
    let userPaused = choice === 'off'
    let request = 0
    let frame = 0
    let gateShown = false

    function fade(to: number, duration: number, finished?: () => void) {
      cancelAnimationFrame(frame)
      const from = sound.volume
      const start = performance.now()
      // iOS ignores element.volume (hardware volume only); the fade is then a no-op.
      function tick(now: number) {
        const p = Math.min(1, (now - start) / duration)
        sound.volume = from + (to - from) * p * p * (3 - 2 * p)
        if (p < 1) frame = requestAnimationFrame(tick)
        else finished?.()
      }
      frame = requestAnimationFrame(tick)
    }

    // play() must be reached synchronously inside the gesture handler, so this
    // function does no async work before calling it.
    async function startPlayback(explicit = false) {
      if (userPaused || document.hidden || (!explicit && !sound.paused)) return
      const token = ++request
      cancelAnimationFrame(frame)
      if (sound.paused) sound.volume = .04
      try {
        await sound.play()
        if (token !== request) return
        setPlaying(true)
        setMessage('')
        fade(.42, 1350)
      } catch (error) {
        if (token !== request) return
        setPlaying(false)
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          if (!explicit && choice === null && !gateShown) {
            gateShown = true
            setGate('open')
          } else if (!gateShown || choice === 'on') {
            setMessage('Tap ♪ to play music')
          }
        } else if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setMessage('Music could not play. Tap ♪ to retry.')
        }
      }
    }

    function startOnGesture(event: Event) {
      // While the cover is up, its own buttons decide; afterwards respect "without music".
      if (!event.isTrusted || gateShown && choice === null) return
      if (event.target instanceof Element && event.target.closest('.music-button,.music-gate')) return
      if (event instanceof PointerEvent && event.type === 'pointerdown' && event.pointerType !== 'mouse') return
      if (event instanceof KeyboardEvent && (event.metaKey || event.ctrlKey || event.altKey || event.key === 'Escape')) return
      void startPlayback()
    }
    function suspend() {
      ++request
      cancelAnimationFrame(frame)
      sound.pause()
      setPlaying(false)
    }
    function onVisibility() {
      if (document.hidden) suspend()
      else if (choice !== null || !gateShown) void startPlayback()
    }
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) void startPlayback() }
    const onPause = () => { if (sound.paused) setPlaying(false) }
    const onError = () => {
      suspend()
      setMessage('Music could not load. Tap ♪ to retry.')
    }

    api.current.open = (music: boolean) => {
      choice = music ? 'on' : 'off'
      saveChoice(choice)
      userPaused = !music
      if (music) {
        try { (navigator as Navigator & { audioSession?: { type: string } }).audioSession!.type = 'playback' } catch { /* not supported */ }
        void startPlayback(true)
      }
      setGate('closing')
    }
    api.current.toggle = () => {
      if (!userPaused && !sound.paused) {
        userPaused = true
        choice = 'off'
        saveChoice(choice)
        ++request
        setPlaying(false)
        setMessage('')
        fade(0, 600, () => sound.pause())
      } else {
        userPaused = false
        choice = 'on'
        saveChoice(choice)
        if (sound.error) sound.load()
        void startPlayback(true)
      }
    }

    const events = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const
    for (const event of events) document.addEventListener(event, startOnGesture, { capture: true, passive: true })
    sound.addEventListener('pause', onPause)
    sound.addEventListener('error', onError)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)
    if (choice !== 'off') void startPlayback()
    return () => {
      ++request
      for (const event of events) document.removeEventListener(event, startOnGesture, true)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
      sound.removeEventListener('pause', onPause)
      sound.removeEventListener('error', onError)
      cancelAnimationFrame(frame)
      sound.pause()
    }
  }, [])

  // Remove the cover after its fade (timer, so reduced-motion needs no animation event).
  useEffect(() => {
    if (gate !== 'closing') return
    const timer = window.setTimeout(() => setGate('hidden'), 750)
    return () => window.clearTimeout(timer)
  }, [gate])

  // Lock page scroll and move focus while the cover is showing.
  useEffect(() => {
    if (gate !== 'open') return
    const root = document.documentElement
    root.classList.add('music-gate-open')
    openButton.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') api.current.open(false) }
    document.addEventListener('keydown', onKey)
    return () => { root.classList.remove('music-gate-open'); document.removeEventListener('keydown', onKey) }
  }, [gate])

  const name = 'Achyutam Keshavam — Uploaded Recording'
  return <>
    <div className="invitation-music" data-testid="invitation-music">
      {/* preload="none": the 8.6 MB track streams only once someone chooses to play it. */}
      <audio ref={ref} src={SELECTED_MUSIC} preload="none" loop />
      <button type="button" className={'music-button' + (playing ? ' is-playing' : '')}
        onClick={() => api.current.toggle()} aria-label={playing ? 'Pause invitation music' : 'Play invitation music'}
        aria-pressed={playing} title={playing ? 'Pause music' : 'Play music'}>
        <span aria-hidden="true">{playing ? '♫' : '♪'}</span>
        <span className="music-label">{playing ? 'Pause music' : 'Play music'}</span>
      </button>
      <button className="music-info-toggle" type="button" aria-expanded={expanded}
        aria-controls="music-info-panel" aria-label="About invitation music"
        onClick={() => setExpanded(v => !v)}>i</button>
      {expanded && <div id="music-info-panel" className="music-info-panel">
        <strong>{name}</strong>
        <span>Local MP3 uploaded by the invitation owner.</span>
      </div>}
      {!playing && message && gate === 'hidden' && <p role="status" className="music-error">{message}</p>}
    </div>
    {gate !== 'hidden' && <div className={'music-gate' + (gate === 'closing' ? ' is-closing' : '')}
      role="dialog" aria-modal="true" aria-labelledby="music-gate-title" data-testid="music-gate">
      <div className="music-gate__card">
        <img src={import.meta.env.BASE_URL + 'rosette.svg'} alt="" width="44" height="44" />
        <p className="music-gate__family">{invitation.familyDisplay}</p>
        <p className="music-gate__title" id="music-gate-title">{invitation.ceremony} <em>{invitation.festival}</em></p>
        <p className="music-gate__meta"><span>{invitation.dateRange}</span><span>{invitation.shortLocation}</span></p>
        <FloralRule />
        <button type="button" ref={openButton} className="music-gate__open" onClick={() => api.current.open(true)}>
          <span aria-hidden="true">♪</span> Open invitation
        </button>
        <button type="button" className="music-gate__quiet" onClick={() => api.current.open(false)}>
          Continue without music
        </button>
      </div>
    </div>}
  </>
}
