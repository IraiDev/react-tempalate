import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { Fallback, ToastProvider } from "@components/common"
import { Router } from "@router/router"

export default function App() {
  return (
    <NextUIProvider className="w-full min-h-screen bg-background text-foreground">
      <Suspense fallback={<Fallback />}>
        <ToastProvider />
        <RouterProvider router={Router} />
      </Suspense>
    </NextUIProvider>
  )
}
