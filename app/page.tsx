import { SearchBox } from "@/components/search-box";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="fixed inset-0 bg-cover bg-center z-[-2]">
        <Image
          src="/background.jpg"
          height={400}
          width={800}
          alt="background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="fixed inset-0 bg-black opacity-55 z-[-1]"></div>
        <SearchBox />
    </div>
  )
};

