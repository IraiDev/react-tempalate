import { apiErrorHandler, api } from "@configs/api"
import { axiosErrorHandler } from "@utils/axios_utils"
import { showErrorInLogs, sleep } from "@utils/functions_utils"
import { saveAuthTokenInLocalStorage } from "@utils/local_storage_utils"
import { authUserAdapter } from "../domain/auth_user_adapter"

export async function loginService(payload: AuthPayload) {
  try {
    await sleep()
    const { data: response, status } = await api.post<HttpResponseWithData>("/login.php", payload)

    apiErrorHandler(status, response.message)
    saveAuthTokenInLocalStorage(response.data?.token)

    return {
      ...response,
      data: authUserAdapter(response.data),
    }
  } catch (e) {
    const errorMessage = axiosErrorHandler(e)
    showErrorInLogs(errorMessage, "login_service")

    throw new Error(errorMessage)
  }
}
