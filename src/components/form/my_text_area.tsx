import { SlotsToClasses, TextAreaProps, Textarea } from "@nextui-org/react"
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

const defaulTextareaProps = (classNames?: ClassNames): TextAreaProps => ({
  size: "md",
  radius: "lg",
  variant: "flat",
  placeholder: " ",
  labelPlacement: "outside",
  classNames: {
    input: "!text-opacity-70 placeholder:!text-opacity-40",
    label: "first-letter:uppercase font-semibold !text-default-950",
    inputWrapper:
      "!ring-primary border border-transparent bg-default-100 hover:bg-default-200 focus-within:!border-default-300 !shadow-none transition-colors",
    innerWrapper: "mb-0 pb-0",
    ...classNames,
  },
})

interface Props<T extends object> extends TextAreaProps {
  control: Control<T>
  controlName: Path<T>
  textareaRef: React.RefObject<HTMLTextAreaElement>
}

export function MyTextarea<T extends object>({
  name,
  control,
  classNames,
  controlName,
  textareaRef,
  ...props
}: Partial<Props<T>>) {
  controlledFieldError(control, controlName)
  if (control && controlName) {
    return (
      <Controller
        name={controlName}
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...defaulTextareaProps(classNames)}
            {...props}
            {...field}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    )
  }

  return <Textarea ref={textareaRef} {...defaulTextareaProps(classNames)} {...props} name={name} />
}
