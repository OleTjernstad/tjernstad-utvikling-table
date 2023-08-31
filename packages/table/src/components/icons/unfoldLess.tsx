import { IconProps } from "./type";
import React from "react";
import { cn } from "../../lib/utils";

export function UnfoldLess({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current text-black", color, className)}
      {...props}
    >
      <path d="m8.9 20l-1.4-1.4l4.5-4.5l4.5 4.5l-1.4 1.4l-3.1-3.1L8.9 20ZM12 9.9L7.5 5.4L8.9 4L12 7.1L15.1 4l1.4 1.4L12 9.9Z"></path>
    </svg>
  );
}
