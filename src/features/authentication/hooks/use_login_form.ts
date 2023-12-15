import { publicRoutes } from "@configs/routes"
import { useMyForm } from "@utils/hooks"
import { hasAuthToken } from "@utils/local_storage_utils"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export function useLoginForm() {
  // estados locales
  const [isLoading, setIsLoading] = useState(false)

  // estados globales
  // const login = useAuthStore((state) => state.login)

  // hooks de utilidades
  const navigate = useNavigate()
  // const { successToast, errorToast, warningToast } = useToast()

  // controlador de formularios
  const { formField, handleSubmit } = useMyForm<AuthPayload>({
    defaultValues: {
      usuario: "",
      contrasena: "",
    },
    // resolver: authFormValidation,
  })

  useEffect(() => {
    if (!hasAuthToken()) return
    navigate(`/${publicRoutes.renew}`, { replace: true })
  }, [navigate])

  const onSubmit: SubmitHandler<AuthPayload> = (values) => {
    setIsLoading(true)
    console.log({ values })
    // login({
    //   payload: values,
    //   successFn: async ({ ok, message }) => {
    //     if (!ok) {
    //       warningToast(message)
    //       return
    //     }

    //     successToast(message)
    //     navigate(`/${privateRoutes.home}`, { replace: true })
    //     reset()
    //   },
    //   errorFn: (message) => {
    //     errorToast(message)
    //   },
    //   finallyFn: () => {
    //     setIsLoading(false)
    //   },
    // })
  }

  return {
    formField,
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
  }
}
