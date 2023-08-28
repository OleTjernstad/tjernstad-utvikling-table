import React from "react";

export function DividerHorizontal(props: any) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="hsl(var(--primary-foreground))"
        fillRule="evenodd"
        d="M2 7.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
