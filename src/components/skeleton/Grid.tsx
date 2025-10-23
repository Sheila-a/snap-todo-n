const Grid = ({
  items,
  count,
  className,
}: {
  items: [number];
  count: number;
  className: string;
}) => {
  items = items || Array.from({ length: count });
  return (
    <div
      className={` ${className}  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5`}
    >
      {items?.map((item, i) => (
        <div className={` rounded-md bg-white  h-full p-6 shadow-base`} key={i}>
          <div className='animate-pulse'>
            <header className='flex justify-between items-center space-x-6'>
              <div className='flex-1 flex items-center space-x-4'>
                <div className='flex-none flex space-x-2 items-center'>
                  <div className='h-10 w-10 rounded bg-[#C4C4C4] '></div>
                </div>
                <div className='flex-1 bg-[#C4C4C4]  h-2 rounded-full'></div>
              </div>
              <div className='flex-none'>
                <div className='h-6 w-6 rounded-full bg-[#C4C4C4] '></div>
              </div>
            </header>
            <div className='py-6 space-y-2'>
              <div className='h-[6px] bg-[#C4C4C4] '></div>
              <div className='h-[6px] bg-[#C4C4C4] '></div>
              <div className='h-[6px] bg-[#C4C4C4] '></div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='space-y-2'>
                <span className='h-[4px] bg-[#C4C4C4]  block'></span>
                <span className='h-[4px] bg-[#C4C4C4]  block'></span>
              </div>

              <div className='space-y-2'>
                <span className='h-[4px] bg-[#C4C4C4]  block'></span>
                <span className='h-[4px] bg-[#C4C4C4]  block'></span>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-5 mt-6'>
              <div className='flex -space-x-1'>
                <div className='h-6 w-6 bg-[#C4C4C4]  rounded-full'></div>
                <div className='h-6 w-6 bg-[#C4C4C4]  rounded-full'></div>
                <div className='h-6 w-6 bg-[#C4C4C4]  rounded-full'></div>
              </div>
              <div>
                <span className='h-[18px] bg-[#C4C4C4]  w-[100px] inline-block rounded-full'></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
