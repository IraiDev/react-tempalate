import { useCallback } from "react"
import { Path, RegisterOptions, UseFormProps, useForm } from "react-hook-form"

interface MyRegisterOptions {
  controlled: boolean
  options: RegisterOptions
  type: "text" | "password" | "date" | "checkbox"
}

export function useMyForm<T extends object>(props: UseFormProps<T>) {
  const { register, watch, ...form } = useForm(props)

  const formField = useCallback(
    (name: Path<T>, options?: Partial<MyRegisterOptions>) => {
      const current = {
        ...register(name, options?.options),
        type: options?.type ?? "text",
        errorMessage: form.formState.errors[name]?.message ?? "",
      }

      if (!options?.controlled) {
        return current
      }

      if (options?.type === "checkbox") {
        return {
          ...current,
          checked: watch(name) as boolean,
        }
      }

      return {
        ...current,
        value: watch(name) as string,
      }
    },
    [form.formState, register, watch],
  )

  return {
    ...form,
    formField,
    watchFieldValue: watch,
  }
}
