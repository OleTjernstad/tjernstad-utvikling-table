import { IconProps } from './type';
import React from 'react';
import { cn } from '../../lib/utils';

export function CaretSort({ color, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-current text-black', color, className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.932 5.432a.45.45 0 1 0 .636.636L7.5 4.136l1.932 1.932a.45.45 0 0 0 .636-.636l-2.25-2.25a.45.45 0 0 0-.636 0l-2.25 2.25Zm5.136 4.136a.45.45 0 0 0-.636-.636L7.5 10.864L5.568 8.932a.45.45 0 0 0-.636.636l2.25 2.25a.45.45 0 0 0 .636 0l2.25-2.25Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
