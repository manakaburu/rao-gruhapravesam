export function TeluguVerse({ lines }: { lines: string[] }) {
  return <p className="verse" lang="te">{lines.map((line, index) =>
    <span className="verse-line" key={index}>{line}</span>,
  )}</p>
}
