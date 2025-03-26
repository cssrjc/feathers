'use client'
import { SearchBox } from "../components/search-box";
import Snowfall from "react-snowfall";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center">
        <h1 className="font-cursive text-9xl">Feathers</h1>
        <p className="mt-6 text-lg">the catalogue 💻 where your collection takes flight 🪶</p>
        <SearchBox/>
      </div>
      <Snowfall />
    </div>
  )
};