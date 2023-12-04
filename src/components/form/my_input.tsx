import { InputProps, Input } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<InputProps, "ref"> {
  ref?: React.RefObject<HTMLInputElement>
}

export function MyInput({ ref, classNames, ...props }: Props) {
  return (
    <Input
      ref={ref}
      size="md"
      radius="lg"
      variant="flat"
      placeholder=" "
      labelPlacement="outside"
      classNames={{
        innerWrapper: "mb-0 pb-0",
        input: "!text-opacity-70 placeholder:!text-opacity-40",
        label: "first-letter:uppercase font-semibold !text-default-950",
        inputWrapper:
          "!ring-primary border border-transparent bg-default-100 hover:bg-default-200 focus-within:!border-default-300 !shadow-none transition-colors",
        ...classNames,
      }}
      {...props}
    />
  )
}
