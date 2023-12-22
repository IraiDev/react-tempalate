import { MyInput } from "@components/form"
import sp from "@configs/search_params"
import { cn } from "@nextui-org/react"
import { IconFilter } from "@tabler/icons-react"
import { useQueryParams } from "@utils/hooks"
import { FocusEvent, FormEvent, useEffect, useRef } from "react"

const { page } = sp

interface Props<T extends string> {
  name: T
  label?: string
  type?: InputTypes
  className?: string
  isLoading?: boolean
  placeholder?: string
}

export function InputFilter<T extends string>({
  label,
  name,
  isLoading,
  placeholder,
  type = "text",
  className = "pl-2 pb-2",
}: Props<T>) {
  const { params, setParams, getParam } = useQueryParams()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current

    if (input === null) return

    input.value = getParam(name, "")
  }, [inputRef, name, getParam])

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
        ref={inputRef}
        size="md"
        name={name}
        type={type}
        label={label}
        className="w-full"
        autoCapitalize="off"
        isDisabled={isLoading}
        onBlur={handleFilterOnBlur}
        placeholder={placeholder ?? "filtrar..."}
        endContent={
          type === "text" && (
            <IconFilter
              size={18}
              className={cn(params.has(name) ? "text-secondary-400" : "text-default-500")}
            />
          )
        }
      />
      <input hidden type="submit" />
    </form>
  )
}
