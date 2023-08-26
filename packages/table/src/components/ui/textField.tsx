import React from 'react';
import { cn } from '../../lib/utils';

//https://codepen.io/SnafuParadise/pen/ExpjaMV material input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    error?: boolean;
    helperText?: string;
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, id, label, error, helperText, ...props }, ref) => {
    return (
        <div className="relative float-label-input bg-inherit">
            <input
                type={type}
                id={id}
                placeholder=" "
                className={cn(
                    'flex w-full  bg-inherit  text-sm shadow-sm transition-colors focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-blue-400  ',
                    className
                )}
                ref={ref}
                aria-invalid={!!error}
                aria-errormessage={'err_' + id}
                {...props}
            />
            <label
                htmlFor={id}
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
            >
                {label}
            </label>
            <span id={'err_' + id} className="errormessage text-destructive">
                {helperText}
            </span>
        </div>
    );
});
TextField.displayName = 'TextField';

export { TextField };
