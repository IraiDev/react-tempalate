import { useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

type Primitives = string | number | boolean

export function useQueryParams<T extends string>() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const getParam = useCallback(
    <R extends Primitives = string>(name: T, defaultValue: R): R => {
      if (typeof defaultValue === "boolean") {
        return (params.get(name) === "true" ?? defaultValue) as R
      }
      return (params.get(name) || defaultValue) as R
    },
    [params],
  )

  const handleNavigateWithQueryParams = <T extends object>(to: string, entry: T) => {
    for (const [key, value] of Object.entries(entry)) {
      params.set(key, value)
    }
    navigate(`${to}?${params.toString()}`)
  }

  return {
    params,
    getParam,
    setParams,
    handleNavigateWithQueryParams,
  }
}
