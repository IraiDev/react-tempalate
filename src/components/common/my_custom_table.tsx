import { TableLoader } from "@components/shared"
import { cn } from "@nextui-org/react"

type Dataset<T extends object> = T & { key: string }

interface Props<T extends object> {
  className?: string
  isLoading?: boolean
  dataset: Dataset<T>[]
  emptyContent?: string
  children?: React.ReactNode
  containerClassName?: string
  columns: CustomTableColumn[]
  alignEmptyContent?: CellAlign
  renderTableFilter?(): React.ReactNode
  renderCells?(item: T, index: number): React.ReactNode
}

export function MyCustomTable<T extends object>({
  children,
  className,
  isLoading,
  renderCells,
  dataset = [],
  columns = [],
  renderTableFilter,
  containerClassName,
  alignEmptyContent = "center",
  emptyContent = "No hay items...",
}: Props<T>) {
  const hasItems = dataset.length > 0 || children !== undefined

  return (
    <div className={containerClassName} style={{ overflow: "auto", width: "100%" }}>
      <table className={cn("min-w-full h-auto table-fixed w-full", className)}>
        <thead className="[&>trs]:last:rounded-lg sticky z-20 [&>trs]:last:shadow-small">
          {renderTableFilter && <tr>{renderTableFilter?.()}</tr>}
          <tr>
            {columns.map(({ content, ...column }) => (
              <th
                {...column}
                className={cn(
                  "data-[focus-visible=true]:outline-focus uppercase",
                  "data-[focus-visible=true]:outline-offset-2 bg-background-200",
                  "data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2",
                  "group px-3 h-10 align-middle whitespace-nowrap text-foreground-600 text-tiny",
                  "data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none",
                  "font-bold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors",
                )}>
                {content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn("relative", !hasItems && "h-16")}>
          {dataset.map(({ key, ...item }: Dataset<T>, idx) => (
            <MyTableRow key={key}>{renderCells?.(item as T, idx)}</MyTableRow>
          ))}
          {children}
          {isLoading && <TableLoader />}
          {!hasItems && (
            <tr>
              <td
                colSpan={columns.length}
                align={alignEmptyContent}
                className="text-default-400 italic">
                {emptyContent}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

interface MyTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export function MyTableRow({ children, ...props }: MyTableRowProps) {
  return (
    <tr
      {...props}
      className={cn(
        "data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2",
        "outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2",
        "even:bg-background-200/50 odd:bg-transparent hover:bg-primary-100 transition-colors",
      )}>
      {children}
    </tr>
  )
}

interface MyTableCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  colSpan: number
  className?: string
  children: React.ReactNode
  valign: CellVerticalAlign
}

export function MyTableCell({ children, className, ...props }: Partial<MyTableCellProps>) {
  return (
    <td
      {...props}
      className={cn(
        "last:before:rounded-r-lg bg-transparent",
        "px-3 relative align-middle whitespace-normal text-small font-normal",
        "group-data-[disabled=true]:text-foreground-300 before:bg-default/40",
        "[&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10",
        "group-data-[odd=true]:before:opacity-100 py-2 first:before:rounded-l-lg",
        "data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus",
        "data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute",
        "before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100",
        "data-[selected=true]:text-default-foreground group-data-[odd=true]:before:bg-default-100",
        className,
      )}>
      {children}
    </td>
  )
}
