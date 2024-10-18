import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FantasyCreatureGenerator from './FantasyCreatureGenerator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FantasyCreatureGenerator/>
  </StrictMode>,
)
