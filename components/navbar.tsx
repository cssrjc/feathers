'use client';
import { usePathname } from 'next/navigation';
import { useRive } from '@rive-app/react-canvas';
import { Feather, Gift, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar() {
  const { rive, RiveComponent } = useRive({
    src: "/feathers-logo.riv",
    artboard: "Artboard",
  });

  const pathname = usePathname();

  const Items = [
    { name: "Home", link: "/", icon: <Feather size={25}/> },
    { name: "Shop", link: "/shop", icon: <Gift size={25}/> },
    { name: "Events", link: "/events", icon: <Calendar size={25}/> },
  ];

  return (
    <div className="flex flex-row mt-5 bg-green-2/10 border border-green-2/20 mx-auto p-1 rounded-full relative">
      {Items.map((item, index) => {
        const isActive = pathname === item.link;

        return (
          <Link key={index} href={item.link} className="relative z-10">
            <div className="relative flex flex-row items-center justify-center px-5 py-2 gap-2 font-sans text-green-2 text-ter sm:text-sec rounded-full">
              {isActive && (
                <motion.div
                  layoutId="tab-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-green-1 border border-green-2/20 z-[-1]"
                />
              )}
              <div>{item.icon}</div>
              <span className='mr-1'>{item.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}