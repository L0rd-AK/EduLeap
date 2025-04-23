import * as React from "react"

interface IconProps extends React.SVGAttributes<SVGElement> {}

function KycIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y1="9" />
      <line x1="3" x2="21" y1="15" y1="15" />
    </svg>
  )
}

export { KycIcon }
