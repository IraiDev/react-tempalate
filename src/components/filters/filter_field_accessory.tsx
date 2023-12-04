import { cn } from "@nextui-org/react"
import { IconSearch } from "@tabler/icons-react"

interface Props {
  label: string
  iconSize?: number
  icon?: React.ReactNode
}

export function FilterFieldAccessory({ iconSize = 17, icon, label }: Props) {
  return (
    <div
      className={cn(
        "flex items-center h-[70%] rounded-small px-2 pr-2.5 gap-1.5",
        "bg-foreground-200 text-foreground-600 transition-colors",
        "group-hover:bg-slate-600 group-hover:text-slate-200",
        "group-focus-within:bg-slate-600 group-focus-within:text-slate-200",
      )}>
      {icon ?? <IconSearch size={iconSize} />}
      <span className="text-xs font-semibold">{label}:</span>
    </div>
  )
}
