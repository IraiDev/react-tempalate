import { Input, InputProps, SlotsToClasses } from "@nextui-org/react"
import { controlledFieldError } from "@utils/erros_utils"
import { Control, Controller, Path } from "react-hook-form"

type ClassNames = SlotsToClasses<
  | "description"
  | "errorMessage"
  | "label"
  | "base"
  | "mainWrapper"
  | "inputWrapper"
  | "innerWrapper"
  | "input"
  | "clearButton"
  | "helperWrapper"
>

const defaultInputProps = (classNames?: ClassNames): InputProps => ({
  size: "md",
  radius: "lg",
  variant: "flat",
  placeholder: " ",
  labelPlacement: "outside",
  classNames: {
    innerWrapper: "mb-0 pb-0",
    // input: "!text-opacity-70 placeholder:!text-opacity-40",
    input: "!text-opacity-70 placeholder:!text-opacity-50",
    label: "first-letter:uppercase font-semibold !text-default-950",
    inputWrapper:
      "!ring-transparent border border-default focus-within:border-secondary bg-default-100 hover:bg-default-200 !shadow-none transition-colors",
    ...classNames,
  },
})

interface Props<T extends object> extends InputProps {
  control: Control<T>
  controlName: Path<T>
  formatValue(value: string): string
  inputRef: React.RefObject<HTMLInputElement>
}

export function MyInput<T extends object>({
  name,
  control,
  inputRef,
  classNames,
  controlName,
  formatValue,
  ...props
}: Partial<Props<T>>) {
  controlledFieldError(control, controlName)
  if (control && controlName) {
    return (
      <Controller
        name={controlName}
        control={control}
        render={({ field: { value: fieldValue, ...restField }, fieldState }) => (
          <>
            <Input
              {...defaultInputProps(classNames)}
              {...props}
              {...restField}
              value={formatValue ? formatValue(fieldValue) : fieldValue}
              errorMessage={fieldState.error?.message}
            />
          </>
        )}
      />
    )
  }
  return <Input ref={inputRef} {...defaultInputProps(classNames)} {...props} name={name} />
}
