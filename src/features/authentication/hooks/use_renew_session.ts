import { privateRoutes, publicRoutes } from "@configs/routes"
import { useAuthStore } from "@features/authentication/stores"
import { useToast } from "@utils/hooks"
import { removeAuthTokenFromLocalStorage } from "@utils/local_storage_utils"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useRenewSession() {
  // hooks de utilidades
  const navigate = useNavigate()
  // const { getFilters } = useLoadFilters()
  const { warningToast, errorToast, successToast } = useToast()

  // estados globales
  const [authentication, renew] = useAuthStore((state) => [state.authentication, state.renew])

  useEffect(() => {
    renew({
      successFn: async ({ ok, message }) => {
        if (ok) {
          // await getFilters()
          successToast(message)
          navigate(`/${privateRoutes.home}`, { replace: true })
          return
        }

        warningToast(message)
        removeAuthTokenFromLocalStorage()
        navigate(`/${publicRoutes.login}`, { replace: true })
      },
      errorFn: (message) => {
        errorToast(message)
        navigate(`/${publicRoutes.login}`, { replace: true })
        removeAuthTokenFromLocalStorage()
      },
    })
  }, [renew, navigate, warningToast, errorToast, successToast])

  return { authentication }
}
