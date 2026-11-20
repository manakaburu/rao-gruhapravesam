import { useEffect, useRef, useState } from 'react'

// Uploaded by the site owner for this invitation. Confirm distribution rights before public hosting.
const SELECTED_MUSIC = import.meta.env.BASE_URL + 'audio/achyutam-keshavam-user-upload.mp3'

export function InvitationMusic() {
  const ref = useRef<HTMLAudioElement>(null)
  const toggle = useRef<() => void>(() => {})
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const sound = ref.current!
    let userPaused = false
    let request = 0
    let frame = 0

    function fade(to: number, duration: number, finished?: () => void) {
      cancelAnimationFrame(frame)
      const from = sound.volume
      const start = performance.now()
      function tick(now: number) {
        const p = Math.min(1, (now - start) / duration)
        sound.volume = from + (to - from) * p * p * (3 - 2 * p)
        if (p < 1) frame = requestAnimationFrame(tick)
        else finished?.()
      }
      frame = requestAnimationFrame(tick)
    }

    async function startPlayback(explicit = false) {
      if (userPaused || document.hidden || (!explicit && !sound.paused)) return
      const token = ++request
      cancelAnimationFrame(frame)
      // A quiet but audible start obeys the browser's normal autoplay policy.
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
          setMessage('Tap to play music')
        } else if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setMessage('Music could not play. Tap Play to retry.')
        }
      }
    }

    function startOnGesture(event: Event) {
      if (!event.isTrusted || (event.target instanceof Element && event.target.closest('.music-button'))) return
      if (event instanceof PointerEvent && event.type === 'pointerdown' && event.pointerType !== 'mouse') return
      if (event instanceof KeyboardEvent && (event.metaKey || event.ctrlKey || event.altKey || event.key === 'Escape')) return
      // Touch activation can arrive at touchend/pointerup; a scroll alone may
      // never qualify. Call play() in the event handler, before any async work.
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
      else void startPlayback()
    }
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) void startPlayback() }
    const onPause = () => { if (sound.paused) setPlaying(false) }
    const onError = () => {
      suspend()
      setMessage('Music could not load. Tap Play to retry.')
    }
    toggle.current = () => {
      if (!userPaused && !sound.paused) {
        userPaused = true
        ++request
        setPlaying(false)
        setMessage('')
        fade(0, 600, () => sound.pause())
      } else {
        userPaused = false
        if (sound.error) sound.load()
        void startPlayback(true)
      }
    }
    const events = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const
    for (const event of events) document.addEventListener(event, startOnGesture, {capture: true, passive: true})
    sound.addEventListener('pause', onPause)
    sound.addEventListener('error', onError)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)
    void startPlayback()
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

  const name = 'Achyutam Keshavam — Uploaded Recording'
  return <div className="invitation-music" data-testid="invitation-music">
    <audio ref={ref} src={SELECTED_MUSIC} preload="auto" loop />
    <button type="button" className={'music-button' + (playing ? ' is-playing' : '')}
      onClick={() => toggle.current()} aria-label={playing ? 'Pause invitation music' : 'Play invitation music'}
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
    {!playing && message && <p role="status" className="music-error">{message}</p>}
  </div>
}
