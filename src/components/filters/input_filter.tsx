import { MyInput } from "@components/form"
import sp from "@configs/search_params"
import { IconFilterSearch } from "@tabler/icons-react"
import { useQueryParams } from "@utils/hooks"
import { FocusEvent, FormEvent } from "react"

const { page } = sp

interface Props {
  name: string
  label: string
  className?: string
  isLoading?: boolean
}

export function InputFilter({ label, name, className = "max-w-xs w-full", isLoading }: Props) {
  const { params, setParams, getParam } = useQueryParams()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const { [name]: input } = e.target as HTMLFormElement
    const isEmpty = !input.value

    isEmpty ? params.delete(input.name) : params.set(input.name, input.value)
    params.set(page.query, page.default)

    setParams(params)
  }

  const handleFilterOnBlur = (e: FocusEvent<any>) => {
    const value = e.target.value
    const name = e.target.name

    if (!value) {
      params.delete(name)
    } else {
      params.set(name, value)
    }

    if (params.get(page.query) && value !== "") {
      params.set(page.query, page.default)
    }
    setParams(params)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <MyInput
        size="sm"
        name={name}
        label={label}
        className="w-full"
        autoCapitalize="off"
        isDisabled={isLoading}
        labelPlacement="inside"
        placeholder="filtrar..."
        onBlur={handleFilterOnBlur}
        endContent={<IconFilterSearch size={15} />}
        defaultValue={getParam(name, "").toString()}
      />
      <input hidden type="submit" />
    </form>
  )
}
