import { apiErrorHandler, api } from "@configs/api"
import { axiosErrorHandler } from "@utils/axios_utils"
import { CONSTANTS } from "@utils/constants"
import { showErrorInLogs, sleep } from "@utils/functions_utils"
import { saveAuthTokenInLocalStorage } from "@utils/local_storage_utils"
import { authUserAdapter } from "../domain/auth_user_adapter"

export async function renewService() {
  try {
    await sleep(1.5)
    const { data: response, status } = await api.get<HttpResponseWithData>("/renew.php", {
      headers: { [CONSTANTS.TOKEN_REQUIRED]: true },
    })

    apiErrorHandler(status, response.message)
    saveAuthTokenInLocalStorage(response.data?.token)

    return {
      ...response,
      data: authUserAdapter(response.data),
    }
  } catch (e) {
    const errorMessage = axiosErrorHandler(e)
    showErrorInLogs(e, "renew_service")

    throw new Error(errorMessage)
  }
}
