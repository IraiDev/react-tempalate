import { isEmptyObject } from "@utils/functions_utils"

interface Props<T extends object> {
  evaluate: T
  children(value: T): React.ReactNode
}

export function IsEmptyObject<T extends object>({ evaluate, children }: Props<T>) {
  if (isEmptyObject(evaluate)) return null

  return <>{children(evaluate)}</>
}
