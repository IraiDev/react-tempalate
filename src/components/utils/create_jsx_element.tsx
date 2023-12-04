import { createElement } from "react"

interface Props extends React.HTMLAttributes<HTMLElement> {
  ref: React.RefObject<HTMLElement>
  as: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className: string
}

export function CreateJsxElement({ as = "div", children, ...props }: Partial<Props>) {
  return createElement(as, props, children)
}
