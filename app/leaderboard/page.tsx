'use client'

import { useState } from "react";

export default function LeaderboardPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = items.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-green-800 via-black to-green-600 opacity-90">
            {/* Dark overlay for subtle effect */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-6 relative z-10">
                {paginatedItems.map((item) => (
                    <div key={item.id} className="border p-4 rounded-lg shadow-lg bg-white">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-60 object-cover rounded-lg" />
                        <h1 className="text-2xl font-bold mt-4 text-gray-900">{item.name}</h1>
                        <p className="text-gray-700">{item.price} feathers</p>
                    </div>
                ))}
            </div>

            <div className="pagination flex justify-center gap-4 mt-6 mb-6 relative z-10">
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Previous
                </button>
                <span className="text-lg text-white">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Next
                </button>
            </div>
        </div>
    )
}
