import { cn } from "@nextui-org/react"

type InnerSize = Size | "xs"

interface Props {
  label: string
  tooltip?: string
  size?: InnerSize
  defaultContent?: string
  content?: string | number
}

export function TextItem({
  label,
  content,
  tooltip,
  size = "sm",
  defaultContent = "sin dato...",
}: Props) {
  const sizes: Record<InnerSize, string> = {
    lg: "text-lg",
    md: "text-base",
    sm: "text-sm",
    xs: "text-xs",
  }

  return (
    <p title={tooltip} className={sizes[size]}>
      <strong className="font-semibold mr-1.5">{label}:</strong>
      <span className={cn(!content && "text-foreground-500")}>{content || defaultContent}</span>
    </p>
  )
}
