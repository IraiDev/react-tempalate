import { privateRoutes, publicRoutes } from "@configs/routes"
import { useAuthStore } from "@features/authentication/stores"
import { useToast } from "@utils/hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useRenewSession() {
  const authentication = useAuthStore((state) => state.authentication)
  const renew = useAuthStore((state) => state.renew)

  const { warningToast, errorToast, successToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    renew({
      successFn: ({ ok, message }) => {
        if (!ok) {
          warningToast(message)
          navigate(`/${publicRoutes.login}`, { replace: true })
          return
        }

        successToast(message)
        navigate(`/${privateRoutes.home}`, { replace: true })
      },
      errorFn: (message) => {
        errorToast(message)
        navigate(`/${publicRoutes.login}`, { replace: true })
      },
    })
  }, [renew, navigate, warningToast, errorToast, successToast])

  return { authentication }
}
