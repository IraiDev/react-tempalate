import { Box, MyButton } from "@components/common"
import { useLogout } from "../hooks"

export function LogoutHandler() {
  const { handleLogout, handleNavigateBack } = useLogout()
  return (
    <Box as="section" className="space-y-4 bg-background-50 h-max">
      <p className="text-center">¿Esta seguro(a) de cerrar sesión?</p>
      <div className="flex items-center justify-center gap-2">
        <MyButton fullWidth variant="flat" onClick={handleNavigateBack}>
          Cancelar
        </MyButton>
        <MyButton fullWidth color="primary" onClick={handleLogout}>
          Confirmar
        </MyButton>
      </div>
    </Box>
  )
}
