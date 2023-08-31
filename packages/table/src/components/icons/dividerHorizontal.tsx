import { IconProps } from "./type";
import React from "react";
import { cn } from "../../lib/utils";

export function DividerHorizontal({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current text-black", color, className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2 7.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
