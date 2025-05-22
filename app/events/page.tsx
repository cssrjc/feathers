'use client'
import { Header } from "@/components/header";
import { useEffect, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { Filter } from "lucide-react";
import db from '@/utils/firebase';
import { AnimatedCard } from "@/components/animations";
import { useEventsStore } from "@/lib/store";
import { EventItem } from "@/lib/types";
import { FilterDropdown } from "@/components/events-filter";

export default function Home() {
  const { events, setEvents } = useEventsStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'redeem' | 'earn'>('all');
  const itemsPerPage: number = 15;

  const fetchEvents = async () => {
    try {
      // throw new Error("Simulated error"); //hehe for testing only
      if (events.length > 0) return;
      const eventsRef = collection(db, 'events');
      const snapshot = await getDocs(eventsRef);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as EventItem[];
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setLoading(true); //also for testing only
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'redeem' && item.redeem) ||
      (filter === 'earn' && item.earn);
  
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedItems = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      const contentTop = document.getElementById('events-top');
      if (contentTop) {
        contentTop.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div id="events-top" className="flex flex-col justify-between items-center w-full h-full">
      <Header header="Events" desc="Check out upcoming events to earn feathers & redeem rewards!" />
      <div className="w-full max-w-6xl px-4 flex flex-col grow">
        <div className="w-full flex flex-row gap-3 my-10">
          <input
            placeholder="search events..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full input-field"
          />
          <FilterDropdown filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage} />
        </div>

        {!loading && error && (
          <div className="text-center text-red-1 flex-grow">
            <p className="text-ter">Error in displaying events. Try again</p>
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center text-red-1 flex-grow">
            <p className="text-ter">No events found</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i}>
                <div className="shimmer w-full aspect-square" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {paginatedItems.map((item) => (
              <AnimatedCard 
                key={item.id}
                animationKey={`${item.id}-${searchQuery}-${currentPage}`}
                shouldSnapIn={!!searchQuery}
              >
                <div className="w-full bg-green-3 text-green-2 relative flex flex-col overflow-hidden justify-between aspect-square p-6 rounded-xl">
                  <div className="flex flex-col gap-7">
                    <p className="text-4xl font-medium font-sketch">{item.name}</p>
                    <p className="text-ter text-green-2/50">{item.description}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    {item.redeem && <p className="px-4 py-2 border rounded-full border-green-2">redeem</p>}
                    {item.earn && <p className="px-4 py-2 border rounded-full border-green-2">earn</p>}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="pagination flex justify-center items-center text-ter gap-6 mt-14 mb-6 relative z-10 text-green-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="hover:bg-green-600/20 py-2 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex gap-2 items-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentPage === i + 1 ? 'bg-green-2' : 'border border-green-2'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="hover:bg-green-600/2 py-2 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
        </div>
      )}
      </div>
    </div>
  )
};