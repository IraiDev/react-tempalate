import { useLayoutEffect } from "react"

interface Options {
  replaceAll?: boolean
}

export function useTitle(title: string, options?: Options) {
  useLayoutEffect(() => {
    if (options?.replaceAll) {
      document.title = title
      return
    }

    document.title = `Curimapu Semillas ${title === "" ? "" : "|"} ${title}`
  }, [title, options])
}
