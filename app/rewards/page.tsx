'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firebase';
import Image from 'next/image';

interface RewardItem {
  id: string;
  link: string;
  name: string;
  price: number;
  stock: boolean;
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 15;

  // Fetch rewards from Firestore
  const fetchRewards = async () => {
    try {
      const rewardsRef = collection(db, 'rewards');
      const snapshot = await getDocs(rewardsRef);
      const rewardsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as RewardItem[];
      setRewards(rewardsData);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  // Filter rewards based on search query
  const filteredRewards = rewards.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);
  const paginatedItems = filteredRewards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      const contentTop = document.getElementById('rewards-header');
      if (contentTop) {
        contentTop.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative bg-gradient-to-r from-green-800 via-black to-green-600 min-h-screen">
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-10">
        <h1 id="rewards-header" className="text-3xl sm:text-4xl font-bold text-center mb-8 mt-30 text-white">
          🎁 Rewards Catalogue
        </h1>
        
        {/* Search Bar */}
        <div className="mb-8 bg-white/10 rounded-xl border border-white/20 text-white">
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full mx-auto block p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-200"
          />
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-md overflow-hidden"
            >
              <div className="w-full aspect-square relative overflow-hidden">
                <Image
                  src={item.link}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                {!item.stock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-5 text-black">
                <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                <p className="text-sm text-green-700 font-semibold">
                  {item.price} feathers
                </p>
              </div>
            </div>
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
      </div>
    </div>
  );
}