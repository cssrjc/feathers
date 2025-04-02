import podiumData from './data'
import LayoutShell from './LayoutShell'
import Podium from './Podium'
import WinnersList from './WinnersList'
import './styles.css'

export interface Winner {
  id: string
  name: string
  avatar: string
  place: number
}

export default function App() {
  const winners = [...podiumData]
    .sort((a, b) => a.rank! - b.rank!)
    .map((winner, place) => ({ ...winner, place }))

  return (
    <LayoutShell>
      <Podium winners={winners} />
      <WinnersList winners={winners} />
    </LayoutShell>
  )
}
