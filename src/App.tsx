import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { Fallback, ToastProvider } from "@components/common"
import { Router } from "@router/_router"

export default function App() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground">
      <Suspense fallback={<Fallback />}>
        <ToastProvider />
        <RouterProvider router={Router} />
      </Suspense>
    </main>
  )
}
