'use client';

import React from 'react';
import { Input } from '../components/ui/input';

interface SearchBarProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     onChange(event.target.value); // convert event → string
  //   };
  return (
    <Input
      type='text'
      placeholder='Search todos...'
      value={value}
      onChange={onChange}
      className='w-full rounded-full bg-[#071847] p-4 py-6 text-white placeholder:text-white outline-none md:max-w-lg'
      aria-label='Search todos by title'
    />
  );
};

export default SearchBar;
