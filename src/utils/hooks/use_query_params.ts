import { useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

type Value = string | number | boolean

export function useQueryParams<T extends string>() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const getParam = useCallback(
    <V extends Value = string>(name: T, defaultValue: V): V => {
      if (typeof defaultValue === "boolean") {
        return (params.get(name) === "true" ?? defaultValue) as V
      }
      if (typeof defaultValue === "number") {
        return +(params.get(name) || defaultValue) as V
      }
      return (params.get(name) || defaultValue) as V
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
