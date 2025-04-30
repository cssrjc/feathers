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
  instagramUrl: string
}

const itemsToDisplay: Event[] = [
  {
    id: 1,
    name: "Raffles Homerun",
    date: "2025-05-20",
    imageUrl: "/background.jpg",
    description: "Join us for a fun-filled day of sports, games, and school spirit!",
    instagramUrl: "https://instagram.com/event1"
  },
  {
    id: 2,
    name: "Feather Fiesta",
    date: "2025-07-10",
    imageUrl: "/background.jpg",
    description: "Celebrate your feathers with music, dancing, and food galore 🎉",
    instagramUrl: "https://instagram.com/event22"
  },
  {
    id: 3,
    name: "Feather Fiesta",
    date: "2025-07-10",
    imageUrl: "/background.jpg",
    description: "Celebrate your feathers with music, dancing, and food galore 🎉",
    instagramUrl: "https://instagram.com/event22"
  },
  {
    id: 4,
    name: "Feather Fiesta",
    date: "2025-07-10",
    imageUrl: "/background.jpg",
    description: "Celebrate your feathers with music, dancing, and food galore 🎉",
    instagramUrl: "https://instagram.com/event22"
  },
  {
    id: 5,
    name: "Sustainability Workshop",
    date: "2025-06-15",
    imageUrl: "/background.jpg",
    description: "Learn creative ways to reduce waste and earn green feathers 🌱",
    instagramUrl: "https://instagram.com/event3"
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      setEvents(itemsToDisplay)
      setLoading(false)
    }, 1000)
  }, [])

  const ITEMS_PER_PAGE = 3  // Adjust to 3 per row on large screens

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE)

  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setTimeout(() => {
      const contentTop = document.getElementById("events-header")
      if (contentTop) {
        contentTop.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }
  

  return (
    <div className="min-h-screen relative bg-gradient-to-r from-green-800 via-black to-green-600">
      <div className="absolute inset-0 bg-black opacity-40 z-0" />

      <div className="pt-30 sm:pt-28 md:pt-28 lg:pt-30 xl:pt-30 relative z-10 w-full max-w-6xl mx-auto px-4 py-10">
        <h1 id="events-header" className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
          📅 Upcoming Events
        </h1>

        {/* Event Grid */}
        {loading ? (
          <div className="flex justify-center items-center text-gray-300">
            <Loader2 className="animate-spin mr-2" />
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-300">No events found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedEvents.map(event => (
                <a
                  key={event.id}
                  href={event.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                      {new Date(event.date).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm">{event.description}</p>
                    <p className="text-left text-sm text-gray-600 mt-3">
                      Tap to view on Instagram 📲
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination flex justify-center items-center gap-6 mt-6 mb-6 relative z-10">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="hover:bg-green-600/20 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-lg text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="hover:bg-green-600/20 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}