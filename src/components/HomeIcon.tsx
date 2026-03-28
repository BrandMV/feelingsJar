import React from "react";

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export function HomeIcon({ title = "Home icon", ...props }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
      {...props}
    >
      <path d="M3 11.5 12 3l9 8.5" />
      <path d="M4 12v8a1 1 0 0 0 1 1h3v-6h8v6h3a1 1 0 0 0 1-1v-8" />
    </svg>
  );
}
