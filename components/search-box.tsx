'use client'
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { collection, getDocs, query, where, QuerySnapshot } from 'firebase/firestore'
import db from '@/utils/firebase'
import Confetti from 'react-confetti'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number';

interface User {
  studentID: string
  feathers: number
}

export function SearchBox() {
  const [search, setSearch] = useState<string>("")
  const [feathers, setFeathers] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
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

  useEffect(() => {setValue(feathers ?? 0)}, [feathers])

  return (
    <div className="flex flex-col mt-120 items-center justify-center gap-4 w-full max-w-3xl mx-auto">
      <div>
        {loading && (
          <div className="text-lg">Loading...</div>
        )}
        {feathers !== null && !loading && (
          <div className="flex flex-col gap-2 items-center text-9xl mb-10">
            <AnimatedNumber   
              value={value}
              springOptions={{
                bounce: 0,
                duration: 5000,
              }}
            />
            <p className="text-xl!">feathers earned!</p>
            <Confetti recycle={false} numberOfPieces={400}/>
          </div>
        )}
        {error && !loading && (
          <div className="text-red-500">
            {error}
          </div>
        )}
      </div>
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