import { IconProps } from "./type";
import React from "react";
import { cn } from "../../lib/utils";

export function UnfoldMore({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current text-black", color, className)}
      {...props}
    >
      <path d="m12 21l-4.5-4.5l1.45-1.45L12 18.1l3.05-3.05l1.45 1.45L12 21ZM8.95 9.05L7.5 7.6L12 3.1l4.5 4.5l-1.45 1.45L12 6L8.95 9.05Z"></path>
    </svg>
  );
}
