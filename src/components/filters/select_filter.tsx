import sp from "@configs/search_params"
import { useQueryParams } from "@utils/hooks"
import { ChangeEvent } from "react"

const { page } = sp

interface Props {
  name: string
  options: Option[]
  isLoading: boolean
  className?: string
}

export function SelectFilter({
  name,
  options,
  isLoading,
  className = "w-full max-w-[130px]",
}: Props) {
  const { params, setParams, getParam } = useQueryParams()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const isEmpty = !value

    isEmpty ? params.delete(name) : params.set(name, value)
    params.set(page.query, page.default)
    setParams(params)
  }

  return (
    <div className={className}>
      <select
        name={name}
        className="w-full"
        disabled={isLoading}
        onChange={handleChange}
        value={[getParam(name, "")]}>
        {options.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
