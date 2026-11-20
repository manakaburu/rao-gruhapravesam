/** Decorative leaves stay at the outside edges; animation is independent of scroll. */
const leaves = [
  { x: 2, delay: -3.4, seconds: 20.6, drift: 13, size: 12, spin: 210 },
  { x: 5, delay: -9.1, seconds: 18.8, drift: 18, size: 11, spin: -185 },
  { x: 9, delay: -5.3, seconds: 23.5, drift: -12, size: 10, spin: 170 },
  { x: 3, delay: -12.4, seconds: 26.1, drift: 22, size: 9, spin: -200 },
  { x: 91, delay: -2.1, seconds: 21.4, drift: -17, size: 12, spin: 200 },
  { x: 95, delay: -10.7, seconds: 23.3, drift: -15, size: 11, spin: -190 },
  { x: 98, delay: -7.6, seconds: 19.9, drift: -11, size: 10, spin: 180 },
  { x: 96, delay: -15.2, seconds: 25.4, drift: -21, size: 9, spin: -175 },
] as const

export function FallingLeaves() {
  return <div className="falling-leaves" aria-hidden="true" data-testid="ambient-corner-leaves">
    {leaves.map((leaf, i) => <span className="falling-leaf" key={i} style={{
      left: `${leaf.x}%`,
      width: `${leaf.size}px`,
      height: `${Math.round(leaf.size * 1.5)}px`,
      animationDuration: `${leaf.seconds}s`,
      animationDelay: `${leaf.delay}s`,
      '--drift': `${leaf.drift}px`,
      '--spin': `${leaf.spin}deg`,
    } as import('react').CSSProperties} />)}
  </div>
}
