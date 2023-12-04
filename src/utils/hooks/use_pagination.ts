import { useEffect, useState } from "react"
import { useQueryParams } from "."
import params from "@configs/search_params"

const { limit, page: pageQuery } = params

interface Props {
  total: number
  isLoading?: boolean
}

export function usePagination({ total }: Props) {
  const [page, setPage] = useState(+pageQuery.default)
  const { params, setParams, getParam } = useQueryParams<"pagina" | "limite">()

  useEffect(() => {
    setPage(+getParam("pagina", pageQuery.default))
  }, [getParam])

  const totalPages = Math.ceil((total || 1) / +getParam("limite", limit.default))

  const onChangePage = (value: number) => {
    setPage(value)
    params.set(pageQuery.query, value.toString())
    setParams(params)
  }

  const onPrevious = () => {
    if (page === 1) return

    const newPage = page - 1
    setPage(newPage)
    params.set(pageQuery.query, newPage.toString())
    setParams(params)
  }

  const onNext = () => {
    if (page === totalPages) return

    const newPage = page + 1
    setPage(newPage)
    params.set(pageQuery.query, newPage.toString())
    setParams(params)
  }

  return {
    totalPages,
    page,
    onNext,
    onPrevious,
    onChangePage,
  }
}
