import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { chapters } from '../data/chapters'
import { invitation } from '../data/invitation'
import { ChapterSpread } from './ChapterSpread'
import { WatercolorTransition } from './WatercolorTransition'
import { Arrow } from './Ornaments'
import { InvitationMusic } from './InvitationMusic'

gsap.registerPlugin(ScrollTrigger)

export function CinematicStage() {
  const stage = useRef<HTMLDivElement>(null)
  const runway = useRef<HTMLDivElement>(null)
  const mast = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDetailsElement>(null)
  const controller = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(() => new Set([0]))
  const reading = new URLSearchParams(location.search).has('reading')

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
    const veil = el.querySelector<HTMLDivElement>('.watercolor-veil')!
    const meter = el.querySelector<HTMLElement>('.progress-fill')!
    const portalTitle = veil.querySelector<HTMLElement>('.chapter-portal__title')!
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
    // Final lock: Vindu Bhojanam and Our New Abode share the paper palette.
    // Emphasize ONLY these two incoming watercolor boundaries.

    // V9: A higher-contrast watercolor aperture reveals a fully opaque next chapter.
    // The old illustration remains stationary behind the incoming stage; the opening
    // expands decisively so two paintings do not remain semi-visible together.
    // The new mask retains soft organic edges with a solid, readable center.
    const portalHeadings: Record<string, string> = {
      welcome: 'Cordially Inviting You & Your Family',
      blessings: 'Divine Blessings',
      ceremonies: 'Auspicious Ceremonies',
      feast: 'Vindu Bhojanam',
      closing: 'Our New Abode',
    }
    let revealBounds: { width: number; height: number } | null = null
    const drawWatercolor = (blend: number, incoming: HTMLElement) => {
      if (!revealBounds) {
        revealBounds = { width: Math.max(1, incoming.clientWidth),
          height: Math.max(1, incoming.clientHeight) }
      }
      // Nonlinear growth holds the center aperture longer, producing a recognizable
      // painting-to-painting reveal instead of a nearly immediate crossfade.
      // At completion, the mask safely covers even the furthest viewport corner.
      const diagonal = Math.hypot(revealBounds.width, revealBounds.height)
      const quietScene = incoming.classList.contains('spread--feast') || incoming.classList.contains('spread--closing')
      // More of the actual feast / framed-address illustration appears near the
      // title glimpse, not just a blank cream center; other scenes are unchanged.
      const growth = Math.pow(ease(blend), quietScene ? 1.90 : 2.25)
      const maskPixels = 1 + 3.45 * diagonal * growth
      incoming.style.setProperty('--watercolor-aperture-size', `${maskPixels.toFixed(1)}px`)
      // Reuse precisely the same mask geometry for a delicate pigment-edge accent.
      // The edge is a temporary visual seam, not an outlined burn ring.
      if (quietScene) {
        veil.style.setProperty('--edge-mask-size', `${maskPixels.toFixed(1)}px`)
        veil.style.setProperty('--quiet-focus-x', window.innerWidth > 860 ? 'calc(50% + 4vw)' : '50%')
        const edge = ease((blend - .08) / .16) * (1 - ease((blend - .79) / .17))
        veil.style.setProperty('--quiet-edge-opacity', (edge * .20).toFixed(4))
        const tint = (0.10 + .11 * ease((blend - .12) / .42)) * (1 - ease((blend - .82) / .18))
        incoming.style.setProperty('--quiet-paper-tint', tint.toFixed(4))
      }
      // Hold a short, legible centered title within the growing watercolor opening.
      // It clears before the regular in-layout heading and body take over.
      const glimpse = ease((blend - .43) / .11) * (1 - ease((blend - .66) / .12))
      veil.style.setProperty('--glimpse-opacity', glimpse.toFixed(4))
      veil.style.setProperty('--glimpse-lift', (1 - ease((blend - .43) / .13)).toFixed(4))
    }
    const render = (p: number) => {
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
      const pair = `${outgoing}:${incoming}`
      if (pair !== previousPair) {
        prepare(outgoing)
        if (incoming !== -1) {
          prepare(incoming)
          portalTitle.textContent = portalHeadings[chapters[incoming].id] ?? chapters[incoming].name
          veil.dataset.quietTransition = incoming >= 4 ? 'true' : 'false'
        }
        sections.forEach((section, i) => {
          section.classList.toggle('current', i === outgoing && incoming === -1)
          section.classList.toggle('departing', i === outgoing && incoming !== -1)
          section.classList.toggle('revealing', i === incoming)
          section.style.zIndex = i === incoming ? '2' : '1'
          if (i !== incoming) {
            section.style.removeProperty('--watercolor-aperture-size')
            section.style.removeProperty('--quiet-paper-tint')
          }
        })
        previousPair = pair
      }
      if (incoming === -1 && p >= chapters[outgoing].start + .012) prepare(outgoing + 1)
      const readingIndex = incoming !== -1 && blend >= .50 ? incoming : outgoing
      if (readingIndex !== current) {
        current = readingIndex
        sections.forEach((section, i) => {
          section.inert = i !== readingIndex
          section.setAttribute('aria-hidden', String(i !== readingIndex))
        })
        setActive(readingIndex)
      }
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
        section.style.setProperty('--incoming-art-opacity', '1')
        // Centered chapter glimpse runs first; the normal heading arrives after it clears.
        // The actual artwork never moves or zooms; only the portal boundary expands.
        const titleOpacity = isIncoming ? ease((blend - .79) / .19)
          : incoming !== -1 ? 1 - ease(blend / .20) : 1
        const textOpacity = isIncoming ? ease((blend - .88) / .12)
          : incoming !== -1 ? 1 - ease(blend / .26) : 1
        section.style.setProperty('--title-opacity', titleOpacity.toFixed(4))
        section.style.setProperty('--paint-depart-opacity', '1')
        section.style.setProperty('--text-opacity', textOpacity.toFixed(4))
      })
      veil.hidden = incoming === -1
      if (incoming === -1) {
        veil.dataset.quietTransition = 'false'
        veil.style.removeProperty('--quiet-edge-opacity')
        veil.style.removeProperty('--edge-mask-size')
        veil.style.removeProperty('--quiet-focus-x')
      }
      if (incoming !== -1) drawWatercolor(blend, sections[incoming])
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
    let scrollDistance = 5800
    let frame = 0

    const updateSizing = () => {
      const headerHeight = mast.current!.offsetHeight
      if (el.dataset.mastHeight !== String(headerHeight)) {
        revealBounds = null
        el.dataset.mastHeight = String(headerHeight)
      }
      document.documentElement.style.setProperty('--mast-actual', `${headerHeight}px`)
      const nextDistance = window.innerWidth <= 860 ? 4200 : 5800
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
      veil.dataset.quietTransition = 'false'
      veil.style.removeProperty('--quiet-edge-opacity')
      veil.style.removeProperty('--edge-mask-size')
      veil.style.removeProperty('--quiet-focus-x')
      for (const key of ['--glimpse-opacity', '--glimpse-lift']) veil.style.removeProperty(key)
      sections.forEach(section => {
        section.inert = false
        section.removeAttribute('aria-hidden')
        section.classList.remove('current', 'revealing', 'departing')
        section.style.removeProperty('z-index')
        section.style.removeProperty('--watercolor-aperture-size')
        section.style.removeProperty('--quiet-paper-tint')
        for (const key of ['--scene-arrive','--scene-depth','--scene-leave','--reveal-progress','--incoming-art-opacity','--title-opacity','--text-opacity','--paint-depart-opacity']) section.style.removeProperty(key)
      })
      current = -1
      previousPair = ''
    }

    const fit = () => {
      if (!alive) return
      updateSizing()
      const canAnimate = !reading && !reduced.matches && mask
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
              scrub: .55,
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
    const resize = new ResizeObserver(schedule)
    resize.observe(mast.current!)
    reduced.addEventListener('change', schedule)
    const onResize = () => {
      // Ignore browser-chrome height oscillation; refresh only when layout width changes.
      if (Math.abs(width - window.innerWidth) < 2) return
      revealBounds = null
      width = window.innerWidth
      schedule()
      if (ctx) requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    window.addEventListener('resize', onResize)
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
      clear()
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
  <div className="story-runway" ref={runway}><div className="stage" ref={stage}><div className="spreads">
    {chapters.map((ch, i) => <ChapterSpread key={ch.id} chapter={ch} ready={loaded.has(i)} />)}
  </div><div className="stage-foot" aria-hidden="true">
    <div className="scene-progress"><span>{String(active + 1).padStart(2, '0')} / 06</span><i><b className="progress-fill" /></i>
      <span>{chapters[active].name}</span></div>
    <div className="scroll-cue"><span>{active === 5 ? 'Event details' : 'Scroll to continue'}</span><Arrow /></div>
  </div><WatercolorTransition /></div></div><InvitationMusic /></>
}
