import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/noto-serif-telugu/telugu-400.css'
import { CinematicStage } from './components/CinematicStage'
import { EventDetails } from './components/EventDetails'
import { FallingLeaves } from './components/FallingLeaves'
import { invitation } from './data/invitation'
import './styles/invitation.css'

document.title = invitation.pageTitle
createRoot(document.getElementById('root')!).render(
  <StrictMode><main><CinematicStage /><EventDetails /><FallingLeaves /></main></StrictMode>,
)
