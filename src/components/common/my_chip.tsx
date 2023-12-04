import { Chip, ChipProps } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<ChipProps, "ref"> {
  ref?: React.RefObject<HTMLDivElement>
}

export function MyChip({ ref, ...props }: Props) {
  return <Chip ref={ref} variant="flat" size="sm" {...props} />
}

// export const MyChip = React.forwardRef(function (
//   props: ChipProps,
//   ref: React.ForwardedRef<HTMLDivElement>,
// ) {
//   return <Chip ref={ref} variant="flat" size="sm" {...props} />
// })
