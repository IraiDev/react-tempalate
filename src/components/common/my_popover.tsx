import { Popover, PopoverProps } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<PopoverProps, "ref"> {
  ref?: React.RefObject<HTMLDivElement>
}

export function MyPopover({ ref, ...props }: Props) {
  return <Popover ref={ref} showArrow backdrop="opaque" placement="left" {...props} />
}

// export const MyPopover = React.forwardRef(function (
//   props: PopoverProps,
//   ref: React.ForwardedRef<HTMLDivElement>,
// ) {
//   return <Popover ref={ref} showArrow backdrop="opaque" placement="left" {...props} />
// })
