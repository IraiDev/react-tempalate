import { To, useNavigate } from "react-router-dom"

export function useNavigateBack() {
  const navigate = useNavigate()

  const handleNavigate = (replace?: boolean) => {
    navigate(-1 as To, { replace })
  }

  return {
    handleNavigate,
  }
}
