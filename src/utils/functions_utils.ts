import axios from "axios"
import { TypeOptions } from "react-toastify"

export function showErrorInLogs(error: unknown, where: string) {
  if (axios.isCancel(error)) return

  console.log(`ERROR EN ${where.toLocaleUpperCase()} (CATCH): `, { error })
}

export function sleep(
  seconds: number | undefined = 1,
  isError: boolean | undefined = false,
): Promise<{ type: TypeOptions; message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isError) {
        resolve({ type: "error", message: "Error" })
      }

      resolve({ type: "success", message: "Correcto" })
    }, seconds * 1000)
  })
}

export function splitStringBy(str: string, char: string, returnPosition?: number) {
  return str.split(char)[returnPosition ?? 0] ?? ""
}

export function isEmptyObject<T extends object>(object: T) {
  return Object.keys(object).length === 0
}

export function resetAllStores() {
  // useLandStore.getState().reset()
  // useOptionsStore.getState().reset()
}

export function sanitizeEntries<T extends object>(entry: T) {
  const output: Record<string, string | number | boolean> = {}

  for (const [key, value] of Object.entries(entry)) {
    if (typeof value === "string") {
      output[key] = value.trim()
    } else {
      output[key] = value
    }
  }

  return output as T
}

export function clipboard(value: string, options?: Omit<StatusCallbacks, "finallyFn">) {
  navigator.clipboard
    .writeText(value)
    .then(function () {
      options?.successFn?.({ ok: true, message: "Copiado al portapapeles" })
    })
    .catch(function (error) {
      console.log(error)
      options?.errorFn?.("Error al copiar en portapapeles")
    })
}
