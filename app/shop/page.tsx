'use client'
import { Header } from "@/components/header";
import { useEffect, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { Feather } from "lucide-react";
import db from '@/utils/firebase'
import Image from 'next/image';

interface RewardItem {
  id: string;
  link: string;
  name: string;
  price: number;
  stock: boolean;
}

export default function Home() {
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const itemsPerPage: number = 15;

  const fetchRewards = async () => {
    try {
      // throw new Error("Simulated error"); //hehe for testing only
      const rewardsRef = collection(db, 'rewards');
      const snapshot = await getDocs(rewardsRef);
      const rewardsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as RewardItem[];
      setRewards(rewardsData);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const filteredRewards = rewards.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);
  const paginatedItems = filteredRewards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      const contentTop = document.getElementById('rewards-top');
      if (contentTop) {
        contentTop.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div id="rewards-top" className="flex flex-col justify-between items-center w-full h-full">
      <Header header="Shop" desc="Shop our latest collection of rewards!" />
      <div className="w-full max-w-6xl px-4 flex flex-col grow">
        <input
          placeholder="search rewards..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full input-field my-10"
        />

        {!loading && error && (
          <div className="text-center text-red-1 flex-grow">
            <p className="text-ter">Error in displaying rewards. Try again</p>
          </div>
        )}

        {!loading && !error && filteredRewards.length === 0 && (
          <div className="text-center text-red-1 flex-grow">
            <p className="text-ter">No rewards found</p>
          </div>
        )}

        {loading && (
          <div className="text-center text-green-2 flex-grow flex items-center justify-center">
            <p className="text-ter">loading...</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden"
            >
              <div className="w-full aspect-square relative overflow-hidden">
                <Image
                  src={item.link}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl transition-transform duration-300 hover:scale-110"
                />
                {!item.stock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-red-1 text-lg font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between text-green-2 text-ter mt-3">
                <h2>{item.name}</h2>
                <div className="flex flex-row gap-2 place-items-baseline">
                  <p>{item.price}</p>
                  <Feather size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && !error && filteredRewards.length > 0 && (
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