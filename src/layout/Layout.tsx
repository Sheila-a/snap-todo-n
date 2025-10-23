'use client';
import React, { ReactNode } from 'react';
import { Navbar } from '../components';

interface LayoutProps {
  children: ReactNode;
  value?: string;
  // onChange?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodosLayout: React.FC<LayoutProps> = ({ children, value, onChange }) => {
  return (
    <div>
      <Navbar value={value} onChange={onChange} />
      <div className='bg-[#071847] mbg-[#030B1A] pb-14'>{children}</div>
    </div>
  );
};

export default TodosLayout;
