import { useState } from "react"

export function useToggle(initialValue?: boolean) {
  const [showPassword, tooglePassword] = useState(initialValue ?? false)

  const handleToggle = () => {
    tooglePassword((prev) => !prev)
  }

  return [showPassword, handleToggle] as const
}
