'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationControlsProps {
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage = 1,
  totalItems = 0,
  onPageChange = () => {},
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / 10));

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className='flex justify-end mt-10 gap-4'>
      <Button
        disabled={currentPage === 1}
        onClick={handlePrevious}
        variant='outline'
      >
        <ChevronLeft />
      </Button>

      <span className='text-sm mt-2 text-white'>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        variant='outline'
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationControls;
