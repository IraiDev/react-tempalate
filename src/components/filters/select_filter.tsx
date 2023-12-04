import { MySelect } from "@components/form"
import sp from "@configs/search_params"
import { useQueryParams } from "@utils/hooks"
import { ChangeEvent } from "react"
import { Path } from "react-hook-form"

const { page } = sp

interface Props<T extends object> {
  name: Path<T>
  label: string
  options: Option[]
  isLoading: boolean
  className?: string
  defaultValue?: string
}

export function SelectFilter<T extends object>({
  name,
  label,
  options,
  isLoading,
  defaultValue = "",
  className = "w-full max-w-[130px]",
}: Props<T>) {
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
      <MySelect
        size="sm"
        name={name}
        label={label}
        options={options}
        className="w-full"
        disabled={isLoading}
        onChange={handleChange}
        value={getParam(name, defaultValue)}
        defaultSelectedKeys={[getParam(name, defaultValue)]}
      />
    </div>
  )
}
