'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { SearchBar } from '.';

interface NavbarProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className='fixed top-0 z-50 w-full shadow-lg'>
      <nav className='flex items-center justify-between bg-white px-[7vw] py-5'>
        <div className='flex w-full items-center gap-2'>
          <Link href='/todos'>
            <h1 className='text-4xl font-bold'>SNAP TODO</h1>
          </Link>
        </div>

        <div className='hidden w-full justify-end md:flex'>
          <SearchBar value={value} onChange={onChange} />
        </div>

        <button
          className='lg:hidden'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <nav
        className={`lg:hidden overflow-hidden bg-white px-[7vw] transition-all duration-300 ${
          isOpen ? 'py-4' : 'max-h-0'
        }`}
      >
        <div className='mt-4 flex flex-col gap-3 md:hidden'>
          <div className='flex items-center gap-2'>
            <SearchBar value={value} onChange={onChange} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
