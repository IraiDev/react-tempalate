import { apiErrorMessage } from "@configs/api"
import { removeAuthTokenFromLocalStorage } from "@utils/local_storage_utils"
import { sleep } from "@utils/functions_utils"
import { create } from "zustand"

type Renew = Pick<StatusCallbacks, "successFn" | "errorFn">
type Logout = Pick<StatusCallbacks, "successFn">

interface State {
  authentication: AuthStates
}

interface Actions {
  login(props: StatusCallbacks): void
  renew(props: Renew): void
  logout(props: Logout): void
}

const initialState: State = {
  authentication: "NOT-AUTHENTICATED",
}

export const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  login: async ({ successFn, finallyFn, errorFn }) => {
    try {
      await sleep()
      successFn?.({ ok: true, message: "mensaje aqui" })

      set({ authentication: "AUTHENTICATED" })
    } catch (error) {
      const message = apiErrorMessage(error)
      errorFn?.(message)
    } finally {
      finallyFn?.()
    }
  },
  renew: async ({ successFn, errorFn }: Renew) => {
    try {
      set({ authentication: "VALIDATING" })

      await sleep()
      successFn?.({ ok: true, message: "mensaje aqui" })

      set({ authentication: "AUTHENTICATED" })
    } catch (error) {
      const message = apiErrorMessage(error)
      errorFn?.(message)
    }
  },
  logout: ({ successFn }: Logout) => {
    set(initialState)
    removeAuthTokenFromLocalStorage()
    successFn?.({ message: "Sesión cerrada", ok: true })
  },
}))
