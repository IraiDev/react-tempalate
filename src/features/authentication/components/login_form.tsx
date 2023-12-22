import { MyButton, PasswordToggler } from "@components/common"
import { Form, MyInput } from "@components/form"
import { Image } from "@nextui-org/react"
import { useFormLogin } from "../hooks"
import { ValidatingLoader } from "."

export function LoginForm() {
  const { control, handleSubmit, isLoading, isValidating } = useFormLogin()

  if (isValidating) {
    return (
      <div className="h-screen w-full grid place-content-center">
        <ValidatingLoader />
      </div>
    )
  }

  return (
    <>
      <aside className="bg-white p-6 md:p-10 h-full grid place-content-center">
        <header className="flex flex-col items-center gap-4 mb-6">
          <picture>
            <Image
              height={170}
              width={170}
              src="/logo-serfoind.png"
              alt="serfoind-logo"
              loading="lazy"
            />
          </picture>
          <h1 className="text-xl font-semibold">Ingrese sus credenciales</h1>
        </header>
        <Form onSubmit={handleSubmit} className="w-80 min-w-[320px]">
          <MyInput
            fullWidth
            label="Usuario"
            control={control}
            controlName="usuario"
            placeholder="ej: juan"
          />
          <PasswordToggler>
            {({ type, Toggler }) => (
              <MyInput
                fullWidth
                type={type}
                control={control}
                label="Contraseña"
                endContent={Toggler}
                controlName="contrasena"
              />
            )}
          </PasswordToggler>
          <MyButton isLoading={isLoading} color="primary" type="submit">
            Ingresar
          </MyButton>
          <span className="mt-3 text-xs text-center">Powered by ZionIT</span>
        </Form>
      </aside>
    </>
  )
}
