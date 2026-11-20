export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className="arrow" aria-hidden="true" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <g transform={diagonal ? 'rotate(-45 10 10)' : undefined}>
      <path d="M10 3v13m-5-5 5 5 5-5" />
    </g>
  </svg>
}

// A printed floral divider, independent of the flowers in the entrance painting.
export function FloralRule() {
  return <div className="floral-rule" aria-hidden="true"><i />
    <svg viewBox="0 0 56 26" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 17q12 4 24-3m4 0q12 7 24 3M9 18q0-6 8-7-1 6-8 7Zm37 0q0-6-8-7 1 6 8 7Z" />
      <g className="floral-petals"><path d="M28 17q-7-7 0-15 7 8 0 15ZM27 18q-9 0-10-10 9 2 10 10Zm2 0q9 0 10-10-9 2-10 10Z" />
      <path d="M23 20q5 3 10 0" /></g>
    </svg><i />
  </div>
}
