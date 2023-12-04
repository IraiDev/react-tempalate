import { TOKEN_KEY } from "./constants"

export function saveAuthTokenInLocalStorage(token: string) {
  if (!token) return
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function removeAuthTokenFromLocalStorage() {
  window.localStorage.removeItem(TOKEN_KEY)
}

export function hasAuthToken(): boolean {
  const token = window.localStorage.getItem(TOKEN_KEY)

  return !!token
}
