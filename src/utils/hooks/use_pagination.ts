import params from "@configs/search_params"
import { useMemo } from "react"
import { useQueryParams } from "."

const { limit, page: pageQuery } = params

interface Props {
  total: number
}

export function usePagination({ total }: Props) {
  const { params, setParams, getParam } = useQueryParams<"pagina" | "limite">()
  const page = useMemo(() => +getParam("pagina", pageQuery.default), [getParam])
  const totalPages = useMemo(
    () => Math.ceil((total || 1) / +getParam("limite", limit.default)),
    [getParam, total],
  )

  const onChangePage = (value: number) => {
    params.set(pageQuery.query, value.toString())
    setParams(params)
  }

  const onPrevious = () => {
    if (page === 1) return

    const newPage = page - 1
    params.set(pageQuery.query, newPage.toString())
    setParams(params)
  }

  const onNext = () => {
    if (page === totalPages) return

    const newPage = page + 1
    params.set(pageQuery.query, newPage.toString())
    setParams(params)
  }

  return {
    page,
    onNext,
    totalPages,
    onPrevious,
    onChangePage,
  }
}
