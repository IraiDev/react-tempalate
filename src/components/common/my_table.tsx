import { TableLoader } from "@components/shared"
import { columnStyles } from "@configs/theme"
import {
  Table,
  TableBody,
  TableBodyProps,
  TableColumn,
  TableHeader,
  TableProps,
} from "@nextui-org/react"
import { useEffect, useRef } from "react"

interface BodyProps extends Partial<TableBodyProps<Column>> {
  currentRowsCount?: number
}

interface Props extends TableProps {
  children: any
  columns: Column[]
  hasItems?: boolean
  bodyProps?: BodyProps
}

export function MyTable({
  columns = [],
  children,
  bodyProps,
  hasItems = false,
  classNames,
  ...props
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const centerScroll = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current
        const newScrollLeft = (scrollWidth - clientWidth) / 2
        containerRef.current.scrollTo({
          left: hasItems || bodyProps?.isLoading ? 0 : newScrollLeft,
          behavior: "smooth",
        })
      }
    }

    centerScroll()

    window.addEventListener("resize", centerScroll)

    return () => {
      window.removeEventListener("resize", centerScroll)
    }
  }, [hasItems, bodyProps?.isLoading])

  return (
    <section ref={containerRef} style={{ overflowX: "auto", width: "100%" }}>
      <Table
        isCompact
        isStriped
        shadow="none"
        removeWrapper
        isHeaderSticky
        layout="fixed"
        aria-label="Tabla"
        topContentPlacement="outside"
        classNames={{
          thead: "-top-4",
          th: "!bg-default-200",
          emptyWrapper: "h-20 italic",
          base: "max-h-[calc(100vh-17px-17px-17px-17px-17px-17px-172px)]",
          ...classNames,
        }}
        {...props}>
        <TableHeader>
          {columns.map(({ content, key, ...rest }, idx) => (
            <TableColumn
              key={key}
              width={rest.width}
              minWidth={rest.width}
              maxWidth={rest.width}
              className={columnStyles(columns, idx, true)}
              {...rest}>
              {content}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          loadingContent={<TableLoader currentRows={bodyProps?.currentRowsCount || 3} />}
          {...bodyProps}>
          {children}
        </TableBody>
      </Table>
    </section>
  )
}
