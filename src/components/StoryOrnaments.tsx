/**
 * Independently animated ornamental layers. SVG paths are authored here rather than
 * pretending the source paintings have transparent depth layers. These are optional
 * atmospheric accents, never replacement artwork or text.
 */
export function StoryOrnaments({ scene }: { scene: string }) {
  return <div className={'story-ornaments story-ornaments--' + scene} aria-hidden="true">
    <svg className="story-layer story-layer--vine story-layer--near" viewBox="0 0 204 252" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-8 12C70 44 18 121 102 154c43 17 33 72 95 98" stroke="#7b6a43" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 50C38 22 75 17 91 30c-3 31-26 38-53 20ZM56 99C81 77 115 88 126 105c-26 19-53 16-70-6ZM92 150c-3-29 20-43 49-44 3 34-22 52-49 44ZM142 194c5-27 34-37 60-24-4 24-25 38-60 24Z" fill="#788454" stroke="#47583d" strokeWidth="2" />
      <g fill="#b44c3e" stroke="#8e4435" strokeWidth="2"><path d="M64 39c3-19 12-19 14 0 17-9 22-3 8 10 16 9 12 18-7 15-3 19-13 20-16 3-17 8-22 0-10-11-15-11-9-20 11-17Z"/><circle cx="67" cy="52" r="5" fill="#d4a553"/></g>
      <path d="M119 147c8-17 22-14 22 3 21-3 22 11 4 16 9 17-4 22-14 8-14 11-25 1-15-12-15-9-12-21 3-15Z" fill="#d7a352" stroke="#a46a42" strokeWidth="2"/>
    </svg>
    <svg className="story-layer story-layer--bell story-layer--mid" viewBox="0 0 96 184" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M48 0v83" stroke="#8b6333" strokeWidth="3"/><path d="M42 20h12M43 35h10M43 53h10" stroke="#c59a54" strokeWidth="2"/>
      <path d="M47 77c-5 15-20 10-22 40-2 13-8 20-15 27h76c-7-7-13-14-15-27-2-30-18-25-24-40Z" fill="#c39957" stroke="#79502d" strokeWidth="3"/>
      <path d="M22 139h51M33 119h30M34 97h29" stroke="#f8dd90" strokeWidth="2"/><ellipse cx="48" cy="148" rx="12" ry="10" fill="#b3843c" stroke="#6e492c" strokeWidth="2"/>
      <path d="M28 162c15-8 25 15 39 0" stroke="#8d5d3a" strokeWidth="2"/><circle cx="48" cy="170" r="4" fill="#b68243"/>
      <g fill="#e9aa3e" opacity=".9"><circle cx="23" cy="67" r="7"/><circle cx="69" cy="68" r="7"/><circle cx="32" cy="58" r="7"/><circle cx="61" cy="59" r="7"/><circle cx="48" cy="61" r="9"/></g>
    </svg>
    <svg className="story-layer story-layer--lotus story-layer--near" viewBox="0 0 164 154" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M83 118C49 96 48 51 82 12c37 37 39 81 1 106Z" fill="#dca861" stroke="#955e43" strokeWidth="2"/>
      <path d="M82 117C51 111 20 75 26 45c27 10 52 43 56 72ZM83 117c34-6 60-42 55-72-30 14-51 43-55 72Z" fill="#b66c51" stroke="#844a3c" strokeWidth="2"/>
      <path d="M82 118C62 136 37 122 9 108c30-23 55-21 73 10Zm2 0c17-31 45-33 71-10-26 14-54 28-71 10Z" fill="#c78c4b" stroke="#955f3b" strokeWidth="2"/>
      <path d="M30 133c37 12 70 12 106 0" stroke="#5d704c" strokeWidth="4" strokeLinecap="round"/>
    </svg>
    <span className="story-petal story-petal--one"/><span className="story-petal story-petal--two"/><span className="story-petal story-petal--three"/>
  </div>
}
