interface HttpResponse {
  ok: boolean
  message: string
}

interface HttpResponseWithData extends HttpResponse {
  data: any
}

interface Column {
  key: string
  align: Align
  width?: number
  content: string
  hidden?: boolean
  sticky?: boolean
}

interface Option {
  key: string
  label: string
}

interface StatusCallbacks {
  finallyFn?(): void
  errorFn?(message: string): void
  successFn?(props: HttpResponse): void
}
