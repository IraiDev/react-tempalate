import { Button, ButtonProps, cn } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<ButtonProps, "ref"> {
  ref?: React.RefObject<HTMLButtonElement>
}

export function MyButton({ ref, className, ...props }: Props) {
  return (
    <Button
      ref={ref}
      size="md"
      radius="lg"
      type="button"
      variant="shadow"
      className={cn("font-semibold focus-visible:!outline-primary", className)}
      {...props}
    />
  )
}

// export const MyButton = React.forwardRef(function (
//   props: ButtonProps,
//   ref: React.ForwardedRef<HTMLButtonElement>,
// ) {
//   return (
//     <Button
//       ref={ref}
//       variant="shadow"
//       size="md"
//       type="button"
//       radius="lg"
//       {...props}
//       className={cn("font-semibold focus-visible:!outline-primary", props.className)}
//     />
//   )
// })
