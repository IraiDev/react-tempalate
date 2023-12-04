import { Navigate } from "react-router-dom"
import { useAuthStore } from "@features/authentication/stores"
import { useTitle } from "@utils/hooks"
import { privateRoutes, publicRoutes } from "@configs/routes"

function RenewView() {
  useTitle("Validando sesión...")
  const authenticationState = useAuthStore((state) => state.authentication)

  if (authenticationState === "AUTHENTICATED") {
    return <Navigate to={`/${privateRoutes.home}`} replace />
  }

  if (authenticationState === "NOT-AUTHENTICATED") {
    return <Navigate to={`/${publicRoutes.login}`} replace />
  }

  return (
    <main className="h-screen w-full grid place-content-center">
      <div className="flex gap-3 items-center">
        <p className="animate-pulse">Validando sesión...</p>
      </div>
    </main>
  )
}

export default RenewView
