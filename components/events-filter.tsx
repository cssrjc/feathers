'use client'
import { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';

type FilterOption = 'all' | 'redeem' | 'earn';

interface FilterDropdownProps {
  filter: FilterOption;
  setFilter: (f: FilterOption) => void;
  setCurrentPage: (page: number) => void;
}

export function FilterDropdown({ filter, setFilter, setCurrentPage }: FilterDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking/tapping outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Large screens: show buttons inline */}
      <div className="hidden sm:flex flex-row border border-green-2/20 bg-green-2/10 rounded-2xl p-1 text-green-2">
        {['all', 'redeem', 'earn'].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f as FilterOption);
              setCurrentPage(1);
              setShowDropdown(false);
            }}
            className={`capitalize px-4 py-2 rounded-[12px] ${
              filter === f ? 'bg-green-1 border border-green-2/20' : 'hover:bg-green-2/20'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Small screens: filter icon */}
      <div className="sm:hidden flex flex-col items-start">
        <button
          onClick={() => setShowDropdown((v) => !v)}
          aria-label="Toggle filter options"
          className="p-2  text-green-2"
        >
          <Filter size={28} />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 z-50 w-40 bg-green-3 border border-green-2/20 rounded-2xl p-1 text-green-2 shadow-xl">
            {['all', 'redeem', 'earn'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f as FilterOption);
                  setCurrentPage(1);
                }}
                className={`capitalize px-4 py-2 rounded-[12px] w-full text-left ${
                  filter === f ? 'bg-green-1 border border-green-2/20' : 'hover:bg-green-2/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}