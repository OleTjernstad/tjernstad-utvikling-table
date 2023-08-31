import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { Check } from "../icons/check";
import { DividerHorizontal } from "../icons/dividerHorizontal";
import React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean;
  }
>(({ className, checked, indeterminate, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      checked={checked ? true : indeterminate ? true : false}
      //   onCheckedChange={setChecked}
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-foreground shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {indeterminate ? (
          <DividerHorizontal color="text-primary-foreground" />
        ) : checked === true ? (
          <Check color="text-primary-foreground" className="h-4 w-4" />
        ) : null}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
