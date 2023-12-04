import axios, { CancelTokenSource } from "axios"
import { MESSAGES } from "./constants"

const { UNEXPECTED_ERROR, REQUEST_CANCELLED } = MESSAGES

export type AxiosCancelToken = undefined | CancelTokenSource

export function axiosErrorHandler(error: unknown) {
  if (axios.isCancel(error)) {
    return REQUEST_CANCELLED
  }

  if (axios.isAxiosError(error)) {
    return error.response?.data.message || UNEXPECTED_ERROR
  }

  return UNEXPECTED_ERROR
}

export const axiosCancelToken = axios.CancelToken
