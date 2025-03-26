'use client'
import { useRive } from '@rive-app/react-canvas';
import { Gift, Info } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Navbar() {
  const { rive, RiveComponent } = useRive({
    src: '/feathers-logo.riv',
    artboard: 'Artboard',
  });

  const Items = [
    {
      name: 'rewards',
      link: '/rewards',
      icon: <Gift size={20}/>
    },
    {
      name: 'what is Feathers?',
      link: '/about',
      icon: <Info size={20}/>
    }
  ];

  return (
    <div className="flex flex-row items-center justify-between w-full p-5">
      <div className="flex flex-row gap-4 items-center">
        <Link 
          href="/" 
          className="font-sans text-7xl tracking-tight"
        >
          Feathers
        </Link>
        <RiveComponent className="w-20 h-20"/>
      </div>
      <div className="flex flex-row mr-2">
        {Items.map((item, index) => (
          <Link 
            key={index} 
            href={item.link} 
          >
            <Button className="flex flex-row items-center gap-3 text-md">
              {item.icon} {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};