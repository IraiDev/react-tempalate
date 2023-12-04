export const {
  VITE_API_BASE_URL: API_BASE_URL = "",
  VITE_TOKEN_KEY: TOKEN_KEY = "",
  VITE_LAST_VISITED_URL: LAST_VISITED_URL = "",
} = import.meta.env

export const CONSTANTS = {
  TOKEN_REQUIRED: "TokenRequired",
}

export const MESSAGES = {
  UNEXPECTED_ERROR: "Error inesperado",
  REQUEST_CANCELLED: "Solicitud cancelada",
}

export const DEFAULT_ICON_SIZE = 20
