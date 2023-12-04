import { useCallback } from "react"
import { TypeOptions, toast } from "react-toastify"

const DEFAULT_SECONDS = 6

interface Config {
  pending?: string
  success?: string
  error?: string
}

interface LoadingToastProps<T extends object> {
  resolve: Promise<T & { type: TypeOptions }>
  config?: Config
  render?(props: T, dismis: () => void): React.ReactNode | undefined
}

const defaultConfig: Config = {
  pending: "Cargando...",
  success: "Descargado con exito",
  error: "Error en la descarga",
}

export function useToast() {
  const successToast = useCallback((message: string) => {
    toast.success(message)
  }, [])

  const infoToast = useCallback((message: string) => {
    toast.info(message)
  }, [])

  const warningToast = useCallback(
    (message: string, seconds: number | undefined = DEFAULT_SECONDS) => {
      toast.warning(message, { autoClose: seconds * 1000 })
    },
    [],
  )

  const errorToast = useCallback(
    (message: string, seconds: number | undefined = DEFAULT_SECONDS) => {
      toast.error(message, { autoClose: seconds * 1000 })
    },
    [],
  )

  const loadingToast = useCallback(
    async <T extends object>({
      resolve,
      config = defaultConfig,
      render,
    }: LoadingToastProps<T>): Promise<T> => {
      const toasId = toast.loading(config.pending)
      const result = await resolve
      toast.update(toasId, {
        render:
          render?.(result, () => toast.dismiss(toasId)) ?? config.success ?? defaultConfig.success,
        type: result.type,
      })

      return result
    },
    [],
  )

  return {
    infoToast,
    errorToast,
    successToast,
    warningToast,
    loadingToast,
  }
}
