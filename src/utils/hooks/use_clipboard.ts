import { clipboard } from "@utils/functions_utils"
import { useToast } from "."

export function useClipboard() {
  const { infoToast, warningToast } = useToast()

  const onSave = (value: string) => {
    clipboard(value, {
      successFn: ({ message }) => {
        infoToast(message)
      },
      errorFn: (message) => {
        warningToast(message)
      },
    })
  }

  return {
    onSave,
  }
}
