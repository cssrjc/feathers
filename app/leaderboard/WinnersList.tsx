import { Winner } from './App'
import WinnerCard from './WinnerCard'

interface Props {
  readonly winners: Winner[]
}

export default function WinnersList({ winners }: Props) {
  return (
    <div className="p-10">
      {winners.map((winner, index) => (
        <WinnerCard
          key={winner.id}
          winners={winners}
          winner={winner}
          index={index}
        />
      ))}
    </div>
  )
}
