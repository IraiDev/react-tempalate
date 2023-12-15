import { publicRoutes } from "@configs/routes"
import { useAuthStore } from "@features/authentication/stores"
import { Navigate, Outlet } from "react-router-dom"

function PrivateGuard() {
  const authentication = useAuthStore((state) => state.authentication)

  if (authentication === "NOT-AUTHENTICATED") {
    return <Navigate to={`/${publicRoutes.login}`} />
  }

  return <Outlet />
}

export default PrivateGuard
