'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface Event {
  id: number
  name: string
  date: string
  imageUrl: string
  description: string
}

const itemsToDisplay: Event[] = [
  {
    id: 1,
    name: "Raffles Homerun",
    date: "2025-05-20",
    imageUrl: "/background.jpg",
    description: "Join us for a fun-filled day of sports, games, and school spirit!",
  },
  {
    id: 2,
    name: "Feather Fiesta",
    date: "2025-07-10",
    imageUrl: "/background.jpg",
    description: "Celebrate your feathers with music, dancing, and food galore 🎉",
  },
  {
    id: 3,
    name: "Sustainability Workshop",
    date: "2025-06-15",
    imageUrl: "/background.jpg",
    description: "Learn creative ways to reduce waste and earn green feathers 🌱",
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setEvents(itemsToDisplay)
      setLoading(false)
    }, 1000)
  }, [])

  return (

    <div className="mh-full relative bg-gradient-to-r from-green-800 via-black to-green-600">
      <div className="absolute inset-0 bg-black opacity-40 z-0" />

      <div className="pt-30 relative z-10 w-full max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white">
          📅 Upcoming Events
        </h1>

        {loading ? (
          <div className="flex justify-center items-center text-gray-300">
            <Loader2 className="animate-spin mr-2" />
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-300">No events available right now.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={event.imageUrl}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-2 text-black">
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <p className="text-sm">
                    {new Date(event.date).toLocaleDateString('en-GB')}
                  </p>
                  <p className="text-sm">{event.description}</p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
