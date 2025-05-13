'use client';

import { useRive } from '@rive-app/react-canvas';
import { Gift, CalendarHeart } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Navbar() {
  const { RiveComponent } = useRive({
    src: '/feathers-logo.riv',
    artboard: 'Artboard',
  });

  const navItems = [
    {
      name: 'Rewards',
      link: '/rewards',
      icon: <Gift className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />,
    },
    {
      name: 'Events',
      link: '/about',
      icon: <CalendarHeart className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg shadow-md border-b border-white/20">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-4 sm:py-5 md:py-6 flex items-center justify-between">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] tracking-tight whitespace-nowrap"
          >
            Feathers
          </Link>
          <RiveComponent className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <Button
                className="h-auto px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-sm sm:text-base md:text-lg flex items-center gap-1.5"
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </Button>
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
}
