import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores"
import { publicRoutes } from "@configs/routes"

export function useLogout() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout({
      successFn: () => {
        navigate(`/${publicRoutes.login}`, { replace: true })
      },
    })
  }

  const handleNavigateBack = () => {
    navigate(-1)
  }

  return {
    handleLogout,
    handleNavigateBack,
  }
}
