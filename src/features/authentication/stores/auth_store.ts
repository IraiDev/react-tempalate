import { apiErrorMessage } from "@configs/api"
import { removeAuthTokenFromLocalStorage } from "@utils/local_storage_utils"
import { create } from "zustand"
import { loginService, renewService } from "../services"

type Renew = StatusCallbacks

interface State {
  forms: UserForms[]
  user: AuthUser | null
  authentication: AuthStates
  privileges: Privileges | null
}

interface Actions {
  renew(props: Renew): void
  logout(): void
  login(props: StatusCallbacks & { payload: AuthPayload }): void
}

const initialState: State = {
  forms: [],
  user: null,
  privileges: null,
  authentication: "NOT-AUTHENTICATED",
}

export const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  login: async ({ payload, successFn, finallyFn, errorFn }) => {
    try {
      const { ok, message, data } = await loginService(payload)
      successFn?.({ ok, message })

      if (!ok) {
        set(initialState)
        return
      }

      set({
        user: data.usuario,
        forms: data.formularios,
        privileges: data.privilegios,
        authentication: "AUTHENTICATED",
      })
    } catch (error) {
      const message = apiErrorMessage(error)
      errorFn?.(message)
    } finally {
      finallyFn?.()
    }
  },
  renew: async ({ successFn, errorFn, finallyFn }: Renew) => {
    try {
      set({ authentication: "VALIDATING" })

      const { ok, message, data } = await renewService()
      successFn?.({ ok, message })

      if (!ok) {
        set(initialState)
        return
      }

      set({
        user: data.usuario,
        forms: data.formularios,
        privileges: data.privilegios,
        authentication: "AUTHENTICATED",
      })
    } catch (error) {
      const message = apiErrorMessage(error)
      errorFn?.(message)
    } finally {
      finallyFn?.()
    }
  },
  logout: () => {
    set(initialState)
    removeAuthTokenFromLocalStorage()
  },
}))
