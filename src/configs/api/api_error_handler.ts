import { MESSAGES } from "@utils/constants"

const { UNEXPECTED_ERROR } = MESSAGES

export function apiErrorHandler(status: number, message: string) {
  if (status < 200 && status > 299) {
    throw new Error(message || `${UNEXPECTED_ERROR} ${message}...`)
  }

  if (status >= 500) {
    throw new Error(UNEXPECTED_ERROR)
  }
}
