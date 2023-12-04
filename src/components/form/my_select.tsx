import { Select, SelectItem, SelectProps, SlotsToClasses } from "@nextui-org/react"

type OmitedSelectProps = Omit<
  SelectProps,
  "children" | "disabledKeys" | "selectedKeys" | "renderValue" | "ref"
>
type SelectSlots = "description" | "base" | "title" | "wrapper" | "selectedIcon" | "shortcut"

interface Props extends OmitedSelectProps {
  name: string
  value: string
  options: Option[]
  ref: React.RefObject<HTMLSelectElement>
  itemClassNames: SlotsToClasses<SelectSlots>
}

export function MySelect({
  ref,
  classNames,
  value = "",
  options = [],
  itemClassNames = {},
  ...props
}: Partial<Props>) {
  return (
    <Select
      ref={ref}
      size="md"
      variant="flat"
      disabledKeys={[value]}
      selectedKeys={[value]}
      selectionMode="single"
      labelPlacement="outside"
      classNames={{
        value: "!text-opacity-70",
        innerWrapper: "mb-0 pb-0",
        label: "first-letter:uppercase font-semibold !text-default-950",
        trigger:
          "focus-visible:!outline-primary border border-transparent bg-default-200/50 hover:bg-default-200 focus-within:!border-default-300 transition-colors",
        ...classNames,
      }}
      {...props}>
      {options.map((option) => (
        <SelectItem key={option.key} textValue={option.label} classNames={itemClassNames ?? {}}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}
