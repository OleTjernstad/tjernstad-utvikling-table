import { IconProps } from "./type";
import React from "react";
import { cn } from "../../lib/utils";

export function KeyboardArrowDown({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current text-black", color, className)}
      {...props}
    >
      <path d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"></path>
    </svg>
  );
}
