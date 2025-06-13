'use client'
import { Header } from "@/components/header";
import { useEffect, useState } from "react"
import { collection, getDocs, query, where, QuerySnapshot } from 'firebase/firestore'
import db from '@/utils/firebase'
import Confetti from 'react-confetti'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number';
import { useUserFeatherStore } from '@/lib/store';
import { UserItem } from "@/lib/types";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Background } from '@/components/background'

export default function Home() {
  const {
    search,
    feathers,
    value,
    setSearch,
    setFeathers,
    setValue,
  } = useUserFeatherStore();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);


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
        const userData = userDoc.data() as UserItem
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
    <div className="flex flex-row justify-between h-full items-center">
    <div className="hidden sm:block h-full relative w-[900px]">
      <Image
        src="/left.svg"
        alt="Feathers"
        fill
        style={{ objectFit: "fill" }}
        priority
      />
    </div>
      <div className="flex flex-col justify-between items-center w-full h-full">
        <motion.div
          animate={{ opacity: isFocused ? 0 : 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 -z-10 overflow-hidden blur-[250px]"
          aria-hidden="true"
        >
          <Background />
        </motion.div>
        <Header header="Feathers" desc="Check how many feathers you've earned!" />
        <div>
          {loading && (
            <div className="text-ter">Loading...</div>
          )}
          {feathers !== null && !loading && (
            <div className="text-green-2 flex flex-col items-center justify-center font-sketch sm:gap-20 leading-30 text-[200px] sm:text-[300px]">
              <AnimatedNumber   
                value={value}
                springOptions={{
                  bounce: 0,
                  duration: 5000,
                }}
              />
              <p className="text-green-2 font-sans text-ter">feathers earned!</p>
              <Confetti recycle={false} numberOfPieces={200} gravity={0.3}/>
            </div> 
          )}
          {error && !loading && (
            <div className="text-red-1">
              {error}
            </div>
          )}
          {/* {feathers === null && !loading && (
            <div className="flex-grow h-full flex flex-col items-center justify-center text-ter">
              <Image
                src="/centre.svg"
                alt="Feathers"
                width={300}
                height={300}
                className="h-[800px]"
              />
            </div>
          )} */}
        </div>
        <form onSubmit={handleSearch} className="mx-auto mb-10">
          <input
            placeholder="Enter your Student ID..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="w-sm input-field"
            disabled={loading}
          />
        </form>
      </div>
      <div className="hidden sm:block h-full relative w-[900px]">
        <Image
          src="/right.svg"
          alt="Feathers"
          fill
          style={{ objectFit: "fill" }}
          priority
        />
      </div>
  </div>
  )
};