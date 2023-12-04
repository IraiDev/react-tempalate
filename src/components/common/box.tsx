import { CreateJsxElement } from "@components/utils"
import { twMerge } from "tailwind-merge"

interface Props extends React.HTMLAttributes<HTMLElement> {
  ref: React.RefObject<HTMLElement>
  as: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className: string
}

export function Box({ as, children, className, ref, ...props }: Partial<Props>) {
  return (
    <CreateJsxElement
      {...props}
      as={as}
      ref={ref}
      className={twMerge(
        "bg-background-50 p-4 rounded-large shadow-lg shadow-background-700/10",
        className,
      )}>
      {children}
    </CreateJsxElement>
  )
}
