import axios from "axios"
import { TypeOptions } from "react-toastify"
import { v4 as uuid } from "uuid"

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
  // useFilterStore.getState().resetFilters()
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

export function formatNumber(value: number = 0, options?: FormatNumberOptions) {
  const defaultOptions: FormatNumberOptions = {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
    locales: "es-CL",
    ...options,
  }

  const adaptedValue = +value

  return Intl.NumberFormat(defaultOptions.locales, defaultOptions).format(adaptedValue)
}

export function tableDatasetAdapter<T extends object>(array: T[]): (DatasetKey & T)[] {
  return array.map((el) => ({ ...el, key: uuid() }))
}

export function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function valiteEmptySpace(value: string) {
  return !/\s/.test(value)
}
