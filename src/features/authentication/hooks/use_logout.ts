import { publicRoutes } from "@configs/routes"
import { resetAllStores } from "@utils/functions_utils"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores"
import { useToast } from "@utils/hooks"

export function useLogout() {
  // estados globales
  const logout = useAuthStore((state) => state.logout)

  // hooks de utilidades
  const navigate = useNavigate()
  const { successToast } = useToast()

  const handleLogout = () => {
    logout()
    resetAllStores()
    navigate(`/${publicRoutes.login}`, { replace: true })
    successToast("Su sesión ha sido cerra con exito.")
  }

  const handleNavigateBack = () => {
    navigate(-1)
  }

  return {
    handleLogout,
    handleNavigateBack,
  }
}
