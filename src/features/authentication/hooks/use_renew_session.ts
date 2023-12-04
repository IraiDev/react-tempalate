import { privateRoutes } from "@configs/routes"
import { useAuthStore } from "@features/authentication/stores"
import { useToast } from "@utils/hooks"
import { hasAuthToken } from "@utils/local_storage_utils"
import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useRenewSession() {
  const authentication = useAuthStore((state) => state.authentication)
  const renew = useAuthStore((state) => state.renew)

  const { warningToast, errorToast, successToast } = useToast()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (hasAuthToken() && authentication === "NOT-AUTHENTICATED") {
      renew({
        successFn: ({ ok, message }) => {
          if (!ok) {
            warningToast(message)
            return
          }

          successToast(message)
          navigate(`/${privateRoutes.home}`, { replace: true })
        },
        errorFn: (message) => {
          errorToast(message)
        },
      })
    }
  }, [authentication, renew, navigate, warningToast, errorToast, successToast])

  return authentication
}
