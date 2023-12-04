import { twJoin } from "tailwind-merge"

export const columnAligns: Record<Align, string> = {
  end: "text-right",
  start: "text-left",
  center: "text-center",
}

export function columnStyles(cols: Column[], index: number, isTh?: boolean) {
  return twJoin(
    columnAligns[cols[index].align],
    isTh ? "bg-default-200" : "bg-white",
    cols[index].sticky && "sticky top-0 right-0 z-50",
  )
}
