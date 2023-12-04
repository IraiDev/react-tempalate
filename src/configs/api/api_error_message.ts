export function apiErrorMessage(error: unknown) {
  const { message } = error as { message: string; stack: string }

  return message
}
