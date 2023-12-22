import { Checkbox, CheckboxProps } from "@nextui-org/react"
import { controlledFieldError } from "@utils/erros_utils"
import { Control, Controller, Path } from "react-hook-form"

interface Props<T extends object> extends CheckboxProps {
  label: string
  control?: Control<T>
  controlName?: Path<T>
  checkboxRef?: React.RefObject<HTMLLabelElement>
}

export function MyCheckbox<T extends object>({
  name,
  label,
  control,
  controlName,
  checkboxRef,
  ...props
}: Props<T>) {
  controlledFieldError(control, controlName)
  if (control && controlName) {
    return (
      <Controller
        control={control}
        name={controlName}
        render={({ field: { value, ...restField } }) => (
          <Checkbox {...props} {...restField} isSelected={value} children={label} />
        )}
      />
    )
  }

  return <Checkbox ref={checkboxRef} {...props} children={label} name={name} />
}
