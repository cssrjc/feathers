import { motion } from 'framer-motion'
import { Winner } from './App'
import { positions } from './constants'

interface Props {
  readonly podium: Winner[]
  readonly winner: Winner
  readonly index: number
}

export default function PodiumStep({ podium, winner, index }: Props) {
  return (
    <div className="flex flex-col place-content-center">
      <motion.div
        custom={index}
        initial="hidden"
        animate="visible"
        variants={{
          visible: () => ({
            opacity: 1,
            transition: {
              delay: 1 + (podium.length - winner.place + 2),
              duration: 0.75
            }
          }),
          hidden: { opacity: 0 }
        }}
        className="mb-1 self-center"
      >
        <img
          src={winner.avatar}
          alt=""
          className="rounded-full overflow-hidden border border-gray-200 shadow-sm w-11 h-11"
        />
      </motion.div>
      <motion.div
        custom={index}
        initial="hidden"
        animate="visible"
        variants={{
          visible: () => ({
            height: 200 * ((podium.length - winner.place) / podium.length),
            opacity: 2,
            transition: {
              delay: 1 + (podium.length - winner.place),
              duration: 2,
              ease: 'backInOut'
            }
          }),
          hidden: { opacity: 0, height: 0 }
        }}
        className="bg-pink-600 flex w-16 border-pink-700 border border-b-0 rounded-t-lg shadow-lg place-content-center hover:border-pink-900 hover:bg-pink-500 cursor-pointer"
        style={{
          marginBottom: -1,
          filter: `opacity(${
            0.1 + (podium.length - winner.place) / podium.length
          })`
        }}
      >
        <span className="self-end text-white font-semibold">
          {positions[winner.place]}
        </span>
      </motion.div>
    </div>
  )
}
