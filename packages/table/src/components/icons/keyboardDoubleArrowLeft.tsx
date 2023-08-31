import { IconProps } from "./type";
import React from "react";
import { cn } from "../../lib/utils";

export function KeyboardDoubleArrowLeft({
  color,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current text-black", color, className)}
      {...props}
    >
      <path d="m11 18l-6-6l6-6l1.4 1.4L7.825 12l4.575 4.6L11 18Zm6.6 0l-6-6l6-6L19 7.4L14.425 12L19 16.6L17.6 18Z"></path>
    </svg>
  );
}
