import { zodResolver } from "@hookform/resolvers/zod"
import { VALIDATION_MESSAGE } from "@utils/constants"
import z from "zod"

const authenticationSchema = z.object({
  usuario: z.string().min(1, { message: VALIDATION_MESSAGE.REQUIRED }),
  contrasena: z.string().min(1, { message: VALIDATION_MESSAGE.REQUIRED }),
})

export const authFormValidation = zodResolver(authenticationSchema)
