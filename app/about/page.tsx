'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import db from '@/utils/firebase';
import { Feather, Gift, Filter } from 'lucide-react';

interface Event {
  id: string;
  description: string;
  earn: boolean;
  redeem: boolean;
  link: string;
  name: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterEarn, setFilterEarn] = useState<boolean>(false);
  const [filterRedeem, setFilterRedeem] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 15; // Match RewardsPage
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const snapshot = await getDocs(eventsRef);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

      // Filter events based on search query and filters
      const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEarn = !filterEarn || event.earn;
        const matchesRedeem = !filterRedeem || event.redeem;
        return matchesSearch && matchesEarn && matchesRedeem;
      });

      // Pagination logic
      const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
      const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setTimeout(() => {
          const contentTop = document.getElementById('events-header');
          if (contentTop) {
            contentTop.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      };

      return (
        <div className="relative bg-gradient-to-r from-green-800 via-black to-green-600 min-h-screen">
          <div className="absolute inset-0 bg-black opacity-40 z-0" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-10">
            <h1 id="events-header" className="text-3xl sm:text-4xl font-bold text-center mb-8 mt-30 text-foreground">
              📅 Upcoming Events
            </h1>

            {/* Search + Legend + Filter Toggle */}
    <div className="bg-white/10 rounded-xl border border-white/20 px-6 py-4 mb-8 text-foreground text-sm sm:text-base flex flex-col gap-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full block p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 bg-background border border-white/20"
      />

      {/* Legend Header with Toggle */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-base sm:text-lg">Legend</span>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 hover:underline"
        >
          <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
          Filters
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 sm:gap-2">
        <div className="flex items-start gap-3">
          <Feather className="text-mygreen flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
          <div className="flex-1 pt-[2px]">
            <strong>Earn:</strong> You may earn feathers by attending this event!
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Gift className="text-blue-400 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
          <div className="flex-1 pt-[2px]">
            <strong>Redeem:</strong> You may redeem your feathers by approaching any student councillor at this event!
          </div>
        </div>
      </div>

      {/* Filters (Toggle Visible) */}
      {showFilters && (
        <div className="flex gap-4 pt-2 text-sm border-t border-white/20 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filterEarn}
              onChange={(e) => {
                setFilterEarn(e.target.checked);
                setCurrentPage(1);
              }}
              className="h-4 w-4 accent-mygreen"
            />
            Earn Feathers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filterRedeem}
              onChange={(e) => {
                setFilterRedeem(e.target.checked);
                setCurrentPage(1);
              }}
              className="h-4 w-4 accent-mygreen"
            />
            Redeem Feathers
          </label>
        </div>
      )}
    </div>


        {/* Event List */}
        <div className="flex flex-col gap-4">
          {paginatedEvents.map(event => (
            <Link
              key={event.id}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-md shadow-md p-5 text-black hover:bg-card/90 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold mb-1 flex flex-wrap items-center gap-2">
                {event.name}
                <span className="flex gap-1 items-center">
                  {event.earn && <Feather className="text-mygreen" size={24}/>}
                  {event.redeem && <Gift className="text-blue-400" size={24}/>}
                </span>
              </h2>
              <p className="text-black">{event.description}</p>
              <p className="text-blue-500 mt-3">
                Tap to view on Instagram 📲
              </p>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination flex justify-center items-center gap-6 mt-6 mb-6 relative z-10">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="button-stuff-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-lg text-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="button-stuff-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}