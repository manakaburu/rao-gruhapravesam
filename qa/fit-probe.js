// Paste into DevTools (or run via a browser harness) on the invitation page.
// Reports, for every chapter, the free space above/below its content and any
// element that is clipped by the pinned stage or spills horizontally.
(() => {
  const out = { viewport: `${innerWidth}x${innerHeight}`, mode: document.querySelector('.stage')?.className,
    docOverflowX: document.documentElement.scrollWidth > innerWidth, chapters: [] }
  document.querySelectorAll('.spread').forEach(s => {
    const r = s.getBoundingClientRect()
    let top = Infinity, bottom = -Infinity
    const clipped = []
    for (const child of s.children) {
      if (child.matches('.story-ornaments,.folio-corner')) continue
      const c = child.getBoundingClientRect()
      if (!c.height) continue
      top = Math.min(top, c.top); bottom = Math.max(bottom, c.bottom)
    }
    s.querySelectorAll('h1,h2,h3,p,time,address,address>*,a,.plate').forEach(e => {
      const c = e.getBoundingClientRect()
      if (!c.width) return
      if (c.right > r.right + 1 || c.left < r.left - 1 || c.bottom > r.bottom + 1 || c.top < r.top - 1)
        clipped.push(`${e.tagName.toLowerCase()}.${[...e.classList].join('.')}`)
      if (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflow !== 'visible') clipped.push('hscroll:' + e.tagName)
    })
    const card = s.querySelector('.address-print address'), paint = s.querySelector('.address-print .plate')
    out.chapters.push({ id: s.id.replace('chapter-', ''), h: Math.round(r.height),
      freeTop: Math.round(top - r.top), freeBottom: Math.round(r.bottom - bottom), clipped,
      ...(card && paint ? { addressFits: card.getBoundingClientRect().bottom <= paint.getBoundingClientRect().bottom + 1 } : {}) })
  })
  return out
})()
