import { Checkbox, CheckboxProps } from "@nextui-org/react"

interface Props extends Omit<CheckboxProps, "ref" | "checked" | "name"> {
  name: string
  label: string
  checked: boolean
  ref: React.RefObject<HTMLLabelElement>
}

export function MyCheckbox({ ref, checked, ...props }: Partial<Props>) {
  return <Checkbox {...props} ref={ref} isSelected={checked} />
}

// const MyCheckbox = React.forwardRef(function (
//   props: CheckboxProps,
//   ref: React.ForwardedRef<HTMLLabelElement>,
// ) {
//   return <Checkbox ref={ref} {...props} />
// })
