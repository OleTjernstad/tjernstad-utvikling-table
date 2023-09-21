import React from 'react';
import { cn } from '../../lib/utils';

//https://codepen.io/SnafuParadise/pen/ExpjaMV material input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, id, label, error, ...props }, ref) => {
  return (
    <div style={{ margin: 'auto' }} className="relative bg-inherit">
      <input
        type={type}
        id={id}
        placeholder=" "
        className={cn(
          'text-foreground border-foreground peer flex w-full appearance-none rounded border bg-transparent px-2 pb-2 pt-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-0 dark:focus:border-blue-500',
          className
        )}
        ref={ref}
        aria-invalid={!!error}
        aria-errormessage={'err_' + id}
        {...props}
      />
      <label
        htmlFor={id}
        className="text-muted-foreground absolute left-1 top-2 origin-[0] -translate-y-5 scale-75 transform bg-inherit px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
});
TextField.displayName = 'TextField';

export { TextField };
