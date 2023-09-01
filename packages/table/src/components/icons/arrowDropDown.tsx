import { IconProps } from './type';
import React from 'react';
import { cn } from '../../lib/utils';

export function ArrowDropDown({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-current text-black', color, className)}
      {...props}
    >
      <path d="m12 15l-5-5h10l-5 5Z"></path>
    </svg>
  );
}
