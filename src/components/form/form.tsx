import { cn } from "@nextui-org/react"

interface Props {
  className: string
  children: React.ReactNode
  ref: React.RefObject<HTMLFormElement>
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

export function Form({ ref, children, className, onSubmit }: Partial<Props>) {
  return (
    <form ref={ref} onSubmit={onSubmit} className={cn("flex flex-col gap-3 w-full", className)}>
      {children}
    </form>
  )
}
