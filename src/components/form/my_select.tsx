import { Select, SelectItem, SelectProps, SlotsToClasses } from "@nextui-org/react"
import { controlledFieldError } from "@utils/erros_utils"
import { Control, Controller, Path } from "react-hook-form"

type OmitedProps = "children" | "disabledKeys" | "selectedKeys" | "renderValue"
type ItemClassNames = SlotsToClasses<
  "description" | "base" | "title" | "wrapper" | "selectedIcon" | "shortcut"
>
type ClassNames = SlotsToClasses<
  | "description"
  | "errorMessage"
  | "label"
  | "base"
  | "value"
  | "mainWrapper"
  | "trigger"
  | "innerWrapper"
  | "selectorIcon"
  | "spinner"
  | "listboxWrapper"
  | "listbox"
  | "popoverContent"
  | "helperWrapper"
>

const defaultSelectProps = (classNames?: ClassNames): Omit<SelectProps, OmitedProps> => ({
  as: "div",
  size: "md",
  variant: "flat",
  selectionMode: "single",
  labelPlacement: "outside",
  classNames: {
    value: "!text-opacity-70",
    innerWrapper: "mb-0 pb-0",
    label: "first-letter:uppercase font-semibold !text-default-950",
    trigger:
      "focus-visible:!outline-transparent border border-default bg-default-200/50 hover:bg-default-200 focus-within:border-secondary transition-colors",
    ...classNames,
  },
})

interface Props<T extends object> extends Omit<SelectProps, OmitedProps> {
  name: string
  value: string
  options: Option[]
  control: Control<T>
  controlName: Path<T>
  itemClassNames: ItemClassNames
  selectRef: React.RefObject<HTMLSelectElement>
}

export function MySelect<T extends object>({
  control,
  selectRef,
  value = "",
  classNames,
  controlName,
  options = [],
  itemClassNames = {},
  ...props
}: Partial<Props<T>>) {
  controlledFieldError(control, controlName)

  if (control && controlName) {
    return (
      <Controller
        control={control}
        name={controlName}
        render={({ field: { value: fieldValue, ...restField }, fieldState }) => (
          <Select
            disabledKeys={[fieldValue]}
            selectedKeys={[fieldValue]}
            {...defaultSelectProps(classNames)}
            {...props}
            {...restField}
            errorMessage={fieldState.error?.message}>
            {options.map((option) => (
              <SelectItem key={option.key} textValue={option.label} classNames={itemClassNames}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    )
  }

  return (
    <Select
      ref={selectRef}
      disabledKeys={[value]}
      selectedKeys={[value]}
      {...defaultSelectProps(classNames)}
      {...props}>
      {options.map((option) => (
        <SelectItem key={option.key} textValue={option.label} classNames={itemClassNames}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}
