import { Skeleton, Spinner, cn } from "@nextui-org/react"

interface Props {
  currentRows?: number
  type?: "skeleton" | "spinner"
}

export function TableLoader({ currentRows = 3, type = "spinner" }: Props) {
  if (type === "spinner") {
    return (
      <section
        className={cn(
          "border border-default-300 ",
          "bg-background-50 p-2 rounded-full flex gap-2 items-center",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
        )}>
        <Spinner color="current" />
      </section>
    )
  }

  return (
    <div className="w-full h-[calc(100%-57px)] bg-background-50 z-50 absolute bottom-0">
      <ul className="space-y-1 p-4 pt-1">
        {Array.from({ length: currentRows }).map((_, idx) => (
          <Skeleton key={idx + 1} as="li" className="rounded-medium">
            <div className="h-11 w-full"></div>
          </Skeleton>
        ))}
      </ul>
    </div>
  )
}
