'use client';

import { useState, useEffect } from 'react';
import db from '@/utils/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import Image from 'next/image';

interface RewardItem {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
}

const itemsToDisplay: RewardItem[] = [
  { id: 1, name: "House Socks", price: 60, imageUrl: "/background.jpg" },
  { id: 2, name: "Griffles Plushie", price: 130, imageUrl: "/background.jpg" },
  { id: 3, name: "Griffles Keychain", price: 70, imageUrl: "/background.jpg" },
  { id: 4, name: "Track & Field Singlet", price: 60, imageUrl: "/background.jpg" },
  { id: 5, name: "House Shirts", price: 80, imageUrl: "/background.jpg" },
  { id: 6, name: "Iron Press House Badges", price: 35, imageUrl: "/background.jpg" },
  { id: 7, name: "Team Raffles 2022 Pins ", price: 40, imageUrl: "/background.jpg" },
  { id: 8, name: "Stickers (Buckle-Buckley)", price: 20, imageUrl: "/background.jpg" },
  { id: 9, name: "Stickers (Morrison-Richardson)", price: 20, imageUrl: "/background.jpg" },
  { id: 10, name: "Stickers (Dream Light Unite)", price: 10, imageUrl: "/background.jpg" },
  { id: 11, name: "Open House Folder", price: 20, imageUrl: "/background.jpg" },
  { id: 12, name: "Pencil Case (Wonderland)", price: 20, imageUrl: "/background.jpg" },
  { id: 13, name: "Notebook (Open house 2023)", price: 30, imageUrl: "/background.jpg" },
  { id: 14, name: "Notebook (Mangata)", price: 30, imageUrl: "/background.jpg" },
  { id: 15, name: "Bookmark (Open House 2023)", price: 10, imageUrl: "/background.jpg" },
  { id: 16, name: "Shoebag (Mangata)", price: 30, imageUrl: "/background.jpg" },
  { id: 17, name: "Shoebag (Wonderland)", price: 40, imageUrl: "/background.jpg" },
  { id: 18, name: "Shoebag (Wayfarers)", price: 40, imageUrl: "/background.jpg" },
  { id: 19, name: "Totebag (Open House 2023)", price: 80, imageUrl: "/background.jpg" },
  { id: 20, name: "Box Files", price: 40, imageUrl: "/background.jpg" },
  { id: 21, name: "Team Raffles Water Bottle", price: 40, imageUrl: "/background.jpg" },
  { id: 22, name: "Towel (Mangata)", price: 20, imageUrl: "/background.jpg" },
  { id: 23, name: "Collapsible Cups Raffles", price: 30, imageUrl: "/background.jpg" },
  { id: 24, name: "Wristband (Morrison-Richardson)", price: 30, imageUrl: "/background.jpg" },
  { id: 25, name: "Totebag (Buckle-Buckley)", price: 80, imageUrl: "/background.jpg" },
  { id: 26, name: "Tattoo (Wonderland)", price: 10, imageUrl: "/background.jpg" },
  { id: 27, name: "Keychain Open House 2022", price: 10, imageUrl: "/background.jpg" },
];

export default function RewardsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;
  const totalPages: number = Math.ceil(itemsToDisplay.length / itemsPerPage);

  const paginatedItems = itemsToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setTimeout(() => {
      const contentTop = document.getElementById("events-header")
      if (contentTop) {
        contentTop.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  };

  const populateRewards = async () => {
    try {
      const rewardsRef = collection(db, 'rewards');
      const snapshot = await getDocs(rewardsRef);

      if (snapshot.empty) {
        const batch = writeBatch(db);

        itemsToDisplay.forEach((item) => {
          const docRef = doc(rewardsRef, item.name);
          batch.set(docRef, {
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          });
        });

        await batch.commit();
        console.log('All rewards have been added successfully!');
      } else {
        console.log('Rewards collection already populated');
      }
    } catch (error) {
      console.error('Error adding rewards:', error);
    }
  };

  useEffect(() => {
    populateRewards();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-green-800 via-black to-green-600 min-h-screen">
      <div className="absolute inset-0 bg-black opacity-40 z-0" />

      <div className="pt-30 relative z-10 w-full max-w-6xl mx-auto px-4 py-10">
        <h1 id="events-header" className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
          🎁 Rewards Catalogue
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2 text-black">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm text-green-700 font-semibold">
                  {item.price} feathers
                </p>
              </div>
            </div>
          ))}
        </div>

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
