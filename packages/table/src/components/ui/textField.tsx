import React from "react";
import { cn } from "../../lib/utils";

//https://codepen.io/SnafuParadise/pen/ExpjaMV material input
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, error, ...props }, ref) => {
    return (
      <div style={{ margin: "auto" }} className="relative bg-inherit">
        <input
          type={type}
          id={id}
          placeholder=" "
          className={cn(
            "flex w-full px-2 pb-2 pt-2 text-sm text-foreground bg-transparent rounded border border-foreground appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-errormessage={"err_" + id}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute text-sm bg-inherit text-muted-foreground duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {label}
        </label>
      </div>
    );
  }
);
TextField.displayName = "TextField";

export { TextField };
