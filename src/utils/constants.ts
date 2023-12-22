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

export const VALIDATION_MESSAGE = {
  REQUIRED: "obligatorio",
}

export const DEFAULT_ICON_SIZE = 20

export const EMPTY_OPTION: Option[] = [{ key: "", label: "Sin seleccion" }]

export const LIMIT_OPTIONS: Option[] = [
  { key: "10", label: "10" },
  { key: "25", label: "25" },
  { key: "50", label: "50" },
]
