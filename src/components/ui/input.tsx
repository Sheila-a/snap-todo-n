import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className='relative'>
      <input
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        data-slot='input'
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-white/60 text-white',
          className
        )}
        {...props}
      />{' '}
      {type === 'password' && (
        <span
          onClick={togglePasswordVisibility}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/80'
        >
          {isPasswordVisible ? <Eye /> : <EyeClosed />}
        </span>
      )}
    </div>
  );
}

export { Input };
