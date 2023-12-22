import { privateRoutes, publicRoutes } from "@configs/routes"
import { useToast } from "@utils/hooks"
import { hasAuthToken } from "@utils/local_storage_utils"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { authFormValidation } from "../domain/auth_validation"
import { useAuthStore } from "../stores"

export function useFormLogin() {
  // estados locales
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)

  // estados globales
  const login = useAuthStore((state) => state.login)

  // hooks de utilidades
  const navigate = useNavigate()
  // const { getFilters } = useLoadFilters()
  const { successToast, errorToast, warningToast } = useToast()

  // controlador de formularios
  const { control, reset, handleSubmit } = useForm<AuthPayload>({
    resolver: authFormValidation,
    defaultValues: {
      usuario: "",
      contrasena: "",
    },
  })

  useEffect(() => {
    if (hasAuthToken()) {
      navigate(`/${publicRoutes.renew}`, { replace: true })
    }
    setIsValidating(false)
  }, [navigate])

  const onSubmit: SubmitHandler<AuthPayload> = (values) => {
    setIsLoading(true)
    login({
      payload: values,
      successFn: async ({ ok, message }) => {
        if (ok) {
          // await getFilters()
          successToast(message)
          navigate(`/${privateRoutes.home}`, { replace: true })
          reset()
          return
        }

        warningToast(message)
      },
      errorFn: (message) => {
        errorToast(message)
      },
      finallyFn: () => {
        setIsLoading(false)
      },
    })
  }

  return {
    control,
    isLoading,
    isValidating,
    handleSubmit: handleSubmit(onSubmit),
  }
}
