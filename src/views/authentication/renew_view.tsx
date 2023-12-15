import { useRenewSession } from "@features/authentication/hooks"
import { Spinner } from "@nextui-org/react"
import { useTitle } from "@utils/hooks"

function RenewView() {
  useTitle("Validando sesión...")
  useRenewSession()

  return (
    <main className="h-screen w-full grid place-content-center">
      <div className="flex gap-3 items-center">
        <Spinner />
        <p className="animate-pulse">Validando sesión...</p>
      </div>
    </main>
  )
}

export default RenewView
