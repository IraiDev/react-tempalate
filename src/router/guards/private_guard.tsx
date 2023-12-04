import { Navigate, Outlet } from "react-router-dom"
import { publicRoutes } from "@configs/routes"
import { useRenewSession } from "@features/authentication/hooks"

function PrivateGuard() {
  const authenticationState = useRenewSession()

  if (authenticationState === "VALIDATING") {
    return <Navigate to={`/${publicRoutes.renew}`} />
  }

  if (authenticationState === "NOT-AUTHENTICATED") {
    return <Navigate to={`/${publicRoutes.login}`} />
  }

  return <Outlet />
}

export default PrivateGuard
