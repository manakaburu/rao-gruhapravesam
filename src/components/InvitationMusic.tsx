import { useEffect, useRef, useState } from 'react'

// Uploaded by the site owner for this invitation. Confirm distribution rights before public hosting.
const SELECTED_MUSIC = import.meta.env.BASE_URL + 'audio/achyutam-keshavam-user-upload.mp3'

export function InvitationMusic() {
  const ref = useRef<HTMLAudioElement | null>(null)
  const raf = useRef<number | null>(null)
  const playingRef = useRef(false)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState('')

  const fade = (to: number, duration: number, finished?: () => void) => {
    const sound = ref.current
    if (!sound) return
    if (raf.current !== null) cancelAnimationFrame(raf.current)
    const from = sound.volume
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      sound.volume = Math.max(0, Math.min(1, from + (to - from) * (p * p * (3 - 2 * p))))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else { raf.current = null; finished?.() }
    }
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    let disposed = false
    const sound = new Audio()
    sound.preload = 'auto'
    sound.loop = true
    sound.volume = 0
    ref.current = sound
    sound.src = SELECTED_MUSIC
    sound.onerror = () => {
      if (disposed) return
      setMessage('Uploaded audio could not be loaded. Please try again.')
      setPlaying(false)
      playingRef.current = false
    }
    // Attempt audible autoplay as early as the browser allows. Browser policy may
    // reject it, especially on Safari; in that case start on the visitor's first
    // natural interaction with the page (including the first touch/scroll). This
    // honors the requested automatic experience without disabling pause controls.
    const startPlayback = () => {
      if (disposed || playingRef.current || userPausedRef.current || document.hidden) return
      // play() is called synchronously inside the actual user-gesture callback.
      void sound.play().then(() => {
        if (disposed || userPausedRef.current) { sound.pause(); return }
        playingRef.current = true
        setPlaying(true)
        setMessage('')
        fade(.42, 1450)
        removeGestures()
      }).catch(() => {
        if (!disposed) setMessage('Tap anywhere to start the music, or use Play')
      })
    }
    const startOnGesture = (event: Event) => {
      // A direct tap on the music button already has its own toggle logic.
      const target = event.target
      if (target instanceof Element && target.closest('.invitation-music')) return
      startPlayback()
    }
    const removeGestures = () => {
      document.removeEventListener('pointerdown', startOnGesture)
      document.removeEventListener('touchstart', startOnGesture)
      document.removeEventListener('keydown', startOnGesture)
    }
    const installGestures = () => {
      document.addEventListener('pointerdown', startOnGesture, { passive: true })
      document.addEventListener('touchstart', startOnGesture, { passive: true })
      document.addEventListener('keydown', startOnGesture)
    }
    installGestures()
    startPlayback()
    const pauseWhenHidden = () => {
      if (document.hidden && !sound.paused) {
        if (raf.current !== null) cancelAnimationFrame(raf.current)
        sound.pause()
        sound.volume = 0
        setPlaying(false)
        playingRef.current = false
      } else if (!document.hidden) {
        // A tab opened in the background can miss the initial autoplay attempt.
        // Try again once visible, but never resume after an intentional Pause.
        startPlayback()
      }
    }
    const onPageShow = () => startPlayback()
    document.addEventListener('visibilitychange', pauseWhenHidden)
    window.addEventListener('pageshow', onPageShow)
    return () => {
      disposed = true
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      window.removeEventListener('pageshow', onPageShow)
      removeGestures()
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      sound.pause()
      sound.removeAttribute('src')
      sound.load()
      ref.current = null
    }
  }, [])

  async function toggleMusic() {
    const sound = ref.current
    if (!sound) return
    if (playingRef.current) {
      userPausedRef.current = true
      playingRef.current = false
      setPlaying(false)
      fade(0, 650, () => { if (!playingRef.current) sound.pause() })
      return
    }
    try {
      userPausedRef.current = false
      sound.volume = 0
      await sound.play()
      playingRef.current = true
      setPlaying(true)
      setMessage('')
      fade(.44, 1350)
    } catch {
      setMessage('Playback unavailable. Check your browser or audio file.')
      setPlaying(false)
      playingRef.current = false
    }
  }

  const name = 'Achyutam Keshavam — Uploaded Recording'
  return <div className="invitation-music" data-testid="invitation-music">
    <button type="button" className={'music-button' + (playing ? ' is-playing' : '')}
      onClick={toggleMusic} aria-label={playing ? 'Pause invitation music' : 'Play invitation music'}
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
