import { PrivateGuard } from "@router/guards"

function PrivateLayout() {
  return (
    <main className="min-h-screen w-full">
      <>
        <PrivateGuard />
      </>
    </main>
  )
}

export default PrivateLayout
