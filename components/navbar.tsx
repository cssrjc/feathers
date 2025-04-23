'use client'
import { useRive } from '@rive-app/react-canvas';
import { Gift, CalendarHeart} from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Navbar() {
  const { rive, RiveComponent } = useRive({
    src: '/feathers-logo.riv',
    artboard: 'Artboard',
  });

  const Items = [
    {
      name: 'Rewards',
      link: '/rewards',
      icon: <Gift size={20} />
    },
    {
      name: 'Events',
      link: '/about',
      icon: <CalendarHeart size={20} />
    },
  ];

  return (
  <nav className="fixed top-0 left-0 w-full z-50 bg-grey/30 backdrop-blur-lg shadow-lg border-white/20">
    <div className="flex flex-row md:items-center justify-between w-full p-5">
      <div className="flex flex-row gap-4 items-center">
        <Link
          href="/"
          className="font-sans text-4xl md:text-7xl tracking-tight"
        >
          Feathers
        </Link>
        <RiveComponent className="w-10 h-10 md:w-20 md:h-20" />
      </div>
      <div className="flex flex-row items-center mr-2">
        {Items.map((item, index) => (
          <Link
            key={index}
            href={item.link}
          >
            <Button
              className="flex flex-row items-center gap-3 text-lg"
            >
              {item.icon}
              <span className='hidden md:block'>{item.name}</span>
            </Button>
          </Link>
        ))}


        <a href="https://docs.google.com/forms/d/e/1FAIpQLScvU2_3s3QGY_9ZC6ajCIMXGoAgEj1ZUu80n5oWtxZtAQ6Bbw/viewform">
          <Button variant="outline" className='ml-4 md:ml-0 py-2'>
            Redeem
          </Button>
        </a>
      </div>
    </div>
  </nav>
  );
};


