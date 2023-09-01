import { IconProps } from './type';
import React from 'react';
import { cn } from '../../lib/utils';

export function ArrowDropUp({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-current text-black', color, className)}
      {...props}
    >
      <path d="m7 14l5-5l5 5H7Z"></path>
    </svg>
  );
}
