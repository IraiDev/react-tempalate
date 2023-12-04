import { TextAreaProps, Textarea } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<TextAreaProps, "ref"> {
  ref?: React.RefObject<HTMLTextAreaElement>
}

export function MyTextarea({ ref, classNames, ...props }: Props) {
  return (
    <Textarea
      ref={ref}
      size="md"
      radius="lg"
      variant="flat"
      placeholder=" "
      labelPlacement="outside"
      classNames={{
        input: "!text-opacity-70 placeholder:!text-opacity-40",
        label: "first-letter:uppercase font-semibold !text-default-950",
        inputWrapper:
          "!ring-primary border border-transparent bg-default-100 hover:bg-default-200 focus-within:!border-default-300 !shadow-none transition-colors",
        innerWrapper: "mb-0 pb-0",
        ...classNames,
      }}
      {...props}
    />
  )
}
