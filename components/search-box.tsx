'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { collection, getDocs, query, where, QuerySnapshot } from 'firebase/firestore'
import db from '@/utils/firebase'
import Confetti from 'react-confetti'

interface User {
  studentID: string
  feathers: number
}

export function SearchBox() {
  const [search, setSearch] = useState<string>("")
  const [feathers, setFeathers] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = async (): Promise<void> => {
    try {
      setLoading(true)
      setFeathers(null)
      setError(null)

      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('studentID', '==', search.trim().toLowerCase()))
      const querySnapshot: QuerySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data() as User
        setFeathers(userData.feathers)
      } else {
        setError('No student found with that ID')
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('An error occurred while searching')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto">
      {loading && (
        <div className="text-lg">Loading...</div>
      )}
      {feathers !== null && !loading && (
        <div className="flex flex-col gap-2 items-center text-9xl mb-10">
          {feathers}
          <p className="text-xl!">feathers earned!</p>
          <Confetti recycle={false} numberOfPieces={400}/>
        </div>
      )}
      {error && !loading && (
        <div className="text-red-500">
          {error}
        </div>
      )}
      
      <div className="w-full">
        <form onSubmit={handleSearch} className="w-full px-10">
          <input
            placeholder="Enter your Student ID..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="border-2 border-border rounded-full p-2 pl-5 w-full focus:border-white focus:outline-none transition-colors duration-300"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}