import { IconProps } from './type';
import React from 'react';
import { cn } from '../../lib/utils';

export function KeyboardArrowLeft({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-current text-black', color, className)}
      {...props}
    >
      <path d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"></path>
    </svg>
  );
}
