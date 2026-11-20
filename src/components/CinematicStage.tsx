import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { chapters, RUNWAY } from '../data/chapters'
import { watercolorAt } from '../data/watercolor'
import { invitation } from '../data/invitation'
import { ChapterSpread } from './ChapterSpread'
import { WatercolorTransition } from './WatercolorTransition'
import { Arrow } from './Ornaments'
import { InvitationMusic } from './InvitationMusic'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/** Resting point of each chapter on the runway (0-1): where each step lands. */
const restAt = (i: number) => i === 0 ? 0 : (chapters[i].start + chapters[i].end) / 2
const GLIDE_SECONDS = 1.5

export function CinematicStage() {
  const stage = useRef<HTMLDivElement>(null)
  const runway = useRef<HTMLDivElement>(null)
  const mast = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDetailsElement>(null)
  const controller = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(() => new Set([0]))
  const [started, setStarted] = useState(false)
  const [nudge, setNudge] = useState(false)
  const glide = useRef<gsap.core.Tween | null>(null)
  const reading = new URLSearchParams(location.search).has('reading')
  const touch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches

  const busy = useRef(false)
  const lastInput = useRef(0)

  /** Scroll positions of every chapter's resting point and of Event details. */
  function positions() {
    const pin = controller.current!
    const stops = chapters.map((_, i) => Math.round(pin.start + (pin.end - pin.start) * restAt(i)))
    const details = document.getElementById('event-details')!
    const detailsY = Math.round(details.getBoundingClientRect().top + window.scrollY - mast.current!.offsetHeight)
    return { stops, detailsY }
  }

  /** Unhurried glide so each watercolor reveal plays out fully. */
  function glideTo(y: number) {
    busy.current = true
    glide.current?.kill()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    // Stay locked until trackpad / phone momentum has died down, so one flick = one chapter.
    const release = () => {
      glide.current = null
      const wait = () => { if (performance.now() - lastInput.current > 220) busy.current = false; else window.setTimeout(wait, 80) }
      wait()
    }
    glide.current = gsap.to(window, {
      duration: reduced ? 0 : GLIDE_SECONDS, ease: 'sine.inOut',
      scrollTo: { y, autoKill: false }, onComplete: release, onInterrupt: release,
    })
  }

  /** Is a step in this direction ours to take (inside the story), or native scrolling? */
  function storyOwns(dir: 1 | -1) {
    if (!controller.current || document.documentElement.classList.contains('music-gate-open')) return false
    const { stops, detailsY } = positions()
    const y = window.scrollY
    return dir > 0 ? y < detailsY - 2 : y > stops[0] + 2 && y <= detailsY + 2
  }

  /** Move exactly one chapter (or into / out of Event details). */
  function step(dir: 1 | -1) {
    if (!storyOwns(dir)) return false
    const { stops, detailsY } = positions()
    const y = window.scrollY
    const target = dir > 0 ? stops.find(s => s > y + 2) ?? detailsY : [...stops].reverse().find(s => s < y - 2)
    if (target === undefined) return false
    glideTo(target)
    return true
  }

  function next() {
    if (busy.current) return
    if (!step(1)) navigate('#event-details', true)
  }

  function navigate(hash: string, updateHistory = false) {
    const target = document.getElementById(hash.slice(1))
    if (!target) return
    if (menu.current) menu.current.open = false
    const index = chapters.findIndex(ch => hash === '#chapter-' + ch.id)
    const pin = controller.current
    if (updateHistory && location.hash !== hash) history.pushState(null, '', hash)
    if (pin && index >= 0) {
      const ch = chapters[index]
      window.scrollTo(0, Math.round(pin.start + (pin.end - pin.start) * (ch.start + (ch.end - ch.start) * .35)))
      ScrollTrigger.update()
    } else {
      target.scrollIntoView({ block: 'start' })
    }
    target.focus({ preventScroll: true })
  }

  function jump(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(e.currentTarget.hash, true)
  }

  useEffect(() => {
    const onHash = () => { if (location.hash) navigate(location.hash) }
    const outside = (e: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) menu.current.open = false
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu.current?.open) {
        menu.current.open = false
        menu.current.querySelector('summary')?.focus()
      }
    }
    window.addEventListener('hashchange', onHash)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [])

  useLayoutEffect(() => {
    const el = stage.current!
    const track = runway.current!
    const sections = Array.from(el.querySelectorAll<HTMLElement>('.spread'))
    const field = el.querySelector<HTMLElement>('.spreads')!
    const veil = el.querySelector<HTMLDivElement>('.watercolor-veil')!
    const meter = el.querySelector<HTMLElement>('.progress-fill')!
    const known = new Set([0])
    const prepare = (n: number) => {
      if (n < 0 || n >= sections.length || known.has(n)) return
      known.add(n)
      setLoaded(new Set(known))
    }
    const observer = new IntersectionObserver(entries => {
      if (controller.current) return
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const i = sections.indexOf(entry.target as HTMLElement)
        prepare(i)
        entry.target.classList.add('in-view')
      })
    }, { rootMargin: '80px 0px', threshold: .06 })
    sections.forEach(section => observer.observe(section))

    const clamp = (n: number) => Math.max(0, Math.min(1, n))
    const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }
    let current = -1
    let previousPair = ''
    let diagonal = 0
    let progress = 0
    const render = (p: number) => {
      progress = p
      let outgoing = 0
      let incoming = -1
      let blend = 0
      for (let i = 0; i < chapters.length - 1; i++) {
        if (p < chapters[i + 1].start) {
          outgoing = i
          if (p > chapters[i].end) {
            incoming = i + 1
            blend = clamp((p - chapters[i].end) / (chapters[i + 1].start - chapters[i].end))
          }
          break
        }
        outgoing = i + 1
      }
      const wash = watercolorAt(blend)
      const pair = `${outgoing}:${incoming}`
      if (pair !== previousPair) {
        prepare(outgoing)
        if (incoming !== -1) {
          prepare(incoming)
          field.dataset.incoming = chapters[incoming].id
        }
        sections.forEach((section, i) => {
          section.classList.toggle('current', i === outgoing && incoming === -1)
          section.classList.toggle('departing', i === outgoing && incoming !== -1)
          section.classList.toggle('revealing', i === incoming)
          section.style.zIndex = i === incoming ? '2' : '1'
        })
        previousPair = pair
      }
      prepare(outgoing + 1)
      const readingIndex = incoming !== -1 && blend >= .50 ? incoming : outgoing
      if (readingIndex !== current) {
        current = readingIndex
        sections.forEach((section, i) => {
          section.inert = i !== readingIndex
          section.setAttribute('aria-hidden', String(i !== readingIndex))
        })
        el.dataset.chapterIndex = String(readingIndex)
        setActive(readingIndex)
      }
      if (p > .004) setStarted(true)
      sections.forEach((section, i) => {
        const isOutgoing = i === outgoing
        const isIncoming = i === incoming
        if (!isOutgoing && !isIncoming) return
        const local = clamp((p - chapters[i].start) / (chapters[i].end - chapters[i].start))
        const arrival = isIncoming ? ease(Math.max(0, (blend - .75) / .25)) : 1
        section.style.setProperty('--scene-arrive', arrival.toFixed(4))
        section.style.setProperty('--scene-depth', local.toFixed(4))
        section.style.setProperty('--scene-leave', (isOutgoing && incoming !== -1 ? (1 - blend) : 1).toFixed(4))
        section.style.setProperty('--reveal-progress', blend.toFixed(4))
        // The incoming chapter's own heading, then its body, surface while the
        // watercolor spreads over them. Artwork never moves or zooms.
        const titleOpacity = isIncoming ? wash.heading : incoming === -1 ? 1 : wash.departingHeading
        const textOpacity = isIncoming ? wash.body : incoming === -1 ? 1 : wash.departingBody
        section.style.setProperty('--title-opacity', titleOpacity.toFixed(4))
        section.style.setProperty('--text-opacity', textOpacity.toFixed(4))
      })
      veil.hidden = incoming === -1
      if (incoming !== -1) {
        if (!diagonal) diagonal = Math.hypot(field.clientWidth, field.clientHeight)
        field.style.setProperty('--watercolor-aperture-size', (1 + 3.45 * diagonal * wash.aperture).toFixed(1) + 'px')
        field.style.setProperty('--pigment', wash.pigment.toFixed(4))
      } else {
        delete field.dataset.incoming
      }
      el.dataset.chapter = chapters[readingIndex].id
      el.dataset.transition = incoming === -1 ? 'hold' : 'watercolor'
      meter.style.transform = `scaleX(${p})`
    }

    // Sticky CSS, not GSAP pin spacers, owns the stage's physical location.
    // Mobile URL bars may change innerHeight mid-scroll, but never switch modes.
    ScrollTrigger.config({ ignoreMobileResize: true })
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const mask = CSS.supports('mask-image', 'url("test.png")') || CSS.supports('-webkit-mask-image', 'url("test.png")')
    let ctx: gsap.Context | undefined
    let alive = true
    let width = window.innerWidth
    let scrollDistance = 0
    let shortStage = false
    let frame = 0
    // 100svh never changes while a mobile toolbar collapses, so the runway and
    // mode chosen from it stay put mid-scroll. Re-measured only on width change.
    const probe = document.createElement('div')
    probe.setAttribute('aria-hidden', 'true')
    probe.style.cssText = 'position:fixed;top:0;left:0;width:0;visibility:hidden;pointer-events:none'
    probe.style.height = '100vh'
    probe.style.height = '100svh'
    document.body.appendChild(probe)

    const updateSizing = () => {
      const headerHeight = mast.current!.offsetHeight
      if (el.dataset.mastHeight !== String(headerHeight)) {
        diagonal = 0
        el.dataset.mastHeight = String(headerHeight)
      }
      document.documentElement.style.setProperty('--mast-actual', `${headerHeight}px`)
      const stageHeight = (probe.offsetHeight || window.innerHeight) - headerHeight
      // Landscape phones cannot hold a whole chapter on one pinned screen; they
      // read the same chapters as a normal, gently revealed document instead.
      shortStage = stageHeight < RUNWAY.shortStage
      const nextDistance = Math.round(Math.max(RUNWAY.min, Math.min(RUNWAY.max, stageHeight * RUNWAY.perStage)))
      if (scrollDistance !== nextDistance) {
        scrollDistance = nextDistance
        track.style.setProperty('--story-scroll-distance', `${scrollDistance}px`)
      }
      el.classList.toggle('compact-story', window.innerWidth <= 860 || window.innerHeight < 800)
    }

    const clear = () => {
      ctx?.revert()
      ctx = undefined
      controller.current = null
      el.classList.remove('is-cinematic', 'story-fallback', 'compact-story')
      track.classList.remove('story-is-active')
      veil.hidden = true
      delete field.dataset.incoming
      field.style.removeProperty('--watercolor-aperture-size')
      field.style.removeProperty('--pigment')
      sections.forEach(section => {
        section.inert = false
        section.removeAttribute('aria-hidden')
        section.classList.remove('current', 'revealing', 'departing')
        section.style.removeProperty('z-index')
        for (const key of ['--scene-arrive','--scene-depth','--scene-leave','--reveal-progress','--title-opacity','--text-opacity']) section.style.removeProperty(key)
      })
      current = -1
      previousPair = ''
    }

    const fit = () => {
      if (!alive) return
      updateSizing()
      const canAnimate = !reading && !reduced.matches && mask && !shortStage
      if (canAnimate && !ctx) {
        // No min-width / hover / per-chapter height gate. These previously disabled
        // the entire story mode and unexpectedly stacked every chapter.
        track.classList.add('story-is-active')
        el.classList.add('is-cinematic')
        el.classList.remove('story-fallback')
        render(0)
        ctx = gsap.context(() => {
          const playhead = { progress: 0 }
          const tween = gsap.to(playhead, {
            progress: 1,
            ease: 'none',
            onUpdate: () => render(playhead.progress),
            scrollTrigger: {
              trigger: track,
              start: () => `top top+=${mast.current!.offsetHeight}`,
              end: () => `+=${scrollDistance}`,
              // CSS position:sticky provides pinning; no jump-prone GSAP spacer.
              // Steps glide chapter to chapter; a slightly longer scrub keeps
              // native scrollbar drags just as smooth.
              scrub: .8,
              invalidateOnRefresh: true,
            },
          })
          controller.current = tween.scrollTrigger!
        }, track)

      } else if (!canAnimate && ctx) {
        clear()
      }
      if (!canAnimate) {
        track.classList.remove('story-is-active')
        el.classList.add('story-fallback')
        sections.forEach(section => {
          section.inert = false
          section.removeAttribute('aria-hidden')
          section.classList.add('in-view')
        })
      }
    }

    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit) }
    const resize = new ResizeObserver(entries => {
      if (entries.some(entry => entry.target === field)) {
        diagonal = 0
        if (controller.current) render(progress)
      }
      if (entries.some(entry => entry.target === mast.current)) schedule()
    })
    resize.observe(field)
    resize.observe(mast.current!)
    reduced.addEventListener('change', schedule)
    const onResize = () => {
      // Ignore browser-chrome height oscillation; refresh only when layout width changes.
      if (Math.abs(width - window.innerWidth) < 2) return
      diagonal = 0
      width = window.innerWidth
      schedule()
      if (ctx) requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    window.addEventListener('resize', onResize)
    // Sequential storytelling: inside the story every wheel notch, swipe or
    // paging key moves exactly one chapter. Event details scroll natively.
    let wheelSum = 0
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || (e.target instanceof Element && e.target.closest('.chapter-menu,.music-info-panel'))) return
      const dy = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
      if (!dy) return
      const dir = dy > 0 ? 1 : -1
      if (!busy.current && !storyOwns(dir)) return
      e.preventDefault()
      lastInput.current = performance.now()
      if (busy.current) { wheelSum = 0; return }
      wheelSum += dy
      if (Math.abs(wheelSum) >= 24) { wheelSum = 0; step(dir) }
    }
    let touchY: number | null = null
    let touchDone = false
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches.length === 1 ? e.touches[0].clientY : null
      touchDone = false
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || e.touches.length !== 1) return
      const dy = touchY - e.touches[0].clientY
      if (Math.abs(dy) < 6) return
      const dir = dy > 0 ? 1 : -1
      if (!busy.current && !storyOwns(dir)) return
      if (e.cancelable) e.preventDefault()
      lastInput.current = performance.now()
      if (!touchDone && !busy.current && Math.abs(dy) > 36) { touchDone = true; step(dir) }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input,textarea,select,[contenteditable="true"]')) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)
      const up = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)
      if (!down && !up) return
      if (e.key === ' ' && t?.closest('button,a,summary')) return
      const dir = down ? 1 : -1
      if (!busy.current && !storyOwns(dir)) return
      e.preventDefault()
      if (!busy.current) step(dir)
    }
    // A scrollbar drag (or find-in-page) that stops mid-wash eases to the nearest chapter.
    let settle = 0
    const onSettle = () => {
      clearTimeout(settle)
      if (busy.current || !controller.current) return
      settle = window.setTimeout(() => {
        if (busy.current || !controller.current) return
        const { stops, detailsY } = positions()
        const y = window.scrollY
        if (y >= detailsY - 2 || stops.some(s => Math.abs(s - y) <= 3)) return
        glideTo(stops.reduce((a, b) => Math.abs(b - y) < Math.abs(a - y) ? b : a))
      }, 280)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onSettle, { passive: true })
    // Guests who pause on a chapter for a while get a gentle pulse on "Next".
    let idle = 0
    const arm = () => { setNudge(false); clearTimeout(idle); idle = window.setTimeout(() => setNudge(true), 6000) }
    window.addEventListener('scroll', arm, { passive: true })
    arm()
    fit()
    const initialHash = location.hash
    document.fonts.ready.then(() => {
      if (!alive) return
      fit()
      if (ctx) ScrollTrigger.refresh()
      if (initialHash && location.hash === initialHash) navigate(initialHash)
    })
    return () => {
      alive = false
      resize.disconnect()
      observer.disconnect()
      cancelAnimationFrame(frame)
      reduced.removeEventListener('change', schedule)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', arm)
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onSettle)
      clearTimeout(idle)
      clearTimeout(settle)
      glide.current?.kill()
      clear()
      probe.remove()
      document.documentElement.style.removeProperty('--mast-actual')
    }
  }, [reading])

  return <><header className="masthead" ref={mast}>
    <div className="family-mark"><img src={import.meta.env.BASE_URL + 'rosette.svg'} alt="" />{invitation.familyDisplay}</div>
    <nav className="shortcuts" aria-label="Invitation navigation">
      <details ref={menu}><summary>Chapters</summary><div className="chapter-menu">
        {chapters.map(ch => <a href={'#chapter-' + ch.id} key={ch.id} onClick={jump}>{ch.name}</a>)}
        <a className="reading-link" href={reading ? './' : '?reading=1'}>{reading ? 'Cinematic view' : 'Read without animation'}</a>
      </div></details>
      <a className="details-link" href="#event-details" onClick={jump} aria-label="Skip animation to event details">Event details <Arrow diagonal /></a>
    </nav>
  </header>
  <div className="story-runway" ref={runway}>
    <div className="stage" ref={stage}><div className="spreads">
    {chapters.map((ch, i) => <ChapterSpread key={ch.id} chapter={ch} ready={loaded.has(i)} />)}
    <WatercolorTransition />
    {!started && <button type="button" className={'scroll-hint' + (touch ? ' scroll-hint--touch' : '')} onClick={next}>
      <span className="scroll-hint__icon" aria-hidden="true"><Arrow /><Arrow /></span>
      <span>{touch ? 'Swipe up to begin' : 'Scroll down to begin'}</span>
    </button>}
  </div><div className="stage-foot">
    <div className="scene-progress" aria-hidden="true"><span>{String(active + 1).padStart(2, '0')} / 06</span><i><b className="progress-fill" /></i>
      <span>{chapters[active].name}</span></div>
    <button type="button" className={'next-chapter' + (nudge && started ? ' is-nudging' : '')} onClick={next}
      aria-label={active === chapters.length - 1 ? 'Go to event details' : 'Next chapter: ' + chapters[active + 1].name}>
      <span>{active === chapters.length - 1 ? 'Event details' : 'Next'}</span><Arrow />
    </button>
  </div></div></div><InvitationMusic /></>
}
