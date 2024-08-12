import { Tooltip as BaseToolTip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltipBase';
import React, { type PropsWithChildren } from 'react';

interface TooltipProps extends PropsWithChildren {
  tip: string;
}
export function Tooltip({ children, tip }: TooltipProps) {
  return (
    <TooltipProvider>
      <BaseToolTip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </BaseToolTip>
    </TooltipProvider>
  );
}
