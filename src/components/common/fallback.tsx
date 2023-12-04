import { Spinner } from "@nextui-org/react"

export function Fallback() {
  return (
    <main className="grid w-full h-screen place-content-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="primary" />
        <span className="animate-pulse">Descargando contenido...</span>
      </div>
    </main>
  )
}
