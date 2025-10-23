import React from 'react';

interface ListLoadingProps {
  items?: number[];
  count: number;
}

const ListLoading: React.FC<ListLoadingProps> = ({ items, count }) => {
  const list = items ?? Array.from({ length: count }, (_, i) => i);

  return (
    <div className='divide-y divide-slate-100'>
      {list.map((item, i) => (
        <div className='p-4 w-full mx-auto' key={i}>
          <div className='animate-pulse flex items-center space-x-4'>
            <div className='flex-none flex space-x-2 items-center'>
              <div className='rounded h-5 w-5 bg-[#C4C4C4]' />
              <div className='rounded h-5 w-5 bg-[#C4C4C4]' />
              <div className='h-8 w-8 rounded-full bg-[#C4C4C4]' />
            </div>
            <div className='flex-1 bg-[#C4C4C4] h-2' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListLoading;
