import { Outlet } from "react-router-dom"

export default function PublicLayout() {
  return (
    <main className="min-h-screen w-full grid place-content-center">
      <Outlet />
    </main>
  )
}
