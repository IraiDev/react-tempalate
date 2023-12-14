import { MyInput } from "@components/form"
import {
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  RadioProps,
  cn,
  useDisclosure,
} from "@nextui-org/react"
import { IconSearch, IconSelector } from "@tabler/icons-react"
import { DEFAULT_ICON_SIZE } from "@utils/constants"
import { useState } from "react"
import { MyButton, MyModal } from "."

type Item = Option & { selected: boolean }

interface Props {
  title: string
  selected?: string
  dataset?: Option[]
  trigger: React.ReactNode
  onSelect?(value: string): void
}

export function Search({ trigger, title, dataset = [], selected, onSelect }: Props) {
  const { isOpen, onOpenChange } = useDisclosure()
  const [items, setItems] = useState<Item[]>(
    dataset.map((el) => ({ selected: selected === el.key, ...el })),
  )

  const handleChangeValue = (value: string) => {
    setItems((prev) => prev.map((el) => ({ ...el, selected: value === el.key })))
  }

  const handleSelect = () => {
    const selectedItem = items.find((el) => el.selected)?.key ?? ""
    onSelect?.(selectedItem)
    handleClose()
  }

  const handleClose = () => {
    setItems(dataset.map((el) => ({ selected: selected === el.key, ...el })))
    onOpenChange()
  }

  // const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const { q } = e.target as HTMLFormElement

  //   const initialDatasetState = dataset.map((el) => ({ selected: selected === el.key, ...el }))

  //   setItems(() => {
  //     if (q.value === "") {
  //       return initialDatasetState
  //     }
  //     return initialDatasetState.filter(
  //       (el) => el.label.includes(q.value) || el.key.includes(q.value),
  //     )
  //   })
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initialDatasetState = dataset.map((el) => ({ selected: selected === el.key, ...el }))
    const value = e.target.value
    setItems(() => {
      if (value === "") {
        return initialDatasetState
      }
      return initialDatasetState.filter(
        (el) =>
          el.key.includes(value) ||
          el.label.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      )
    })
  }

  return (
    <>
      <button
        onClick={onOpenChange}
        className={cn(
          "!outline-none flex items-center gap-2 h-max",
          "hover:text-primary transition-colors group",
        )}>
        {trigger}
        <figure
          className={cn(
            "h-7 w-7 grid place-content-center rounded-full",
            "group-hover:bg-primary-200/70 group-hover:text-primary transition-colors",
          )}>
          <IconSelector size={DEFAULT_ICON_SIZE} />
        </figure>
      </button>
      <MyModal
        size="md"
        hideHeader
        isDismissable
        isOpen={isOpen}
        hideCloseButton
        onClose={handleClose}
        isKeyboardDismissDisabled={false}
        classNames={{
          // header: "p-4 py-3 !text-xl !font-semibold",
          body: "px-2 pb-2",
          footer: "p-2",
        }}>
        <ModalBody>
          {/* <form onSubmit={handleFilter}> */}
          <MyInput
            autoFocus
            name="q"
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Buscar..."
            onChange={handleInputChange}
            endContent={<IconSearch size={DEFAULT_ICON_SIZE} />}
          />
          {/* <input hidden type="submit" />
          </form> */}
          <section className="p-2 pb-0">
            {dataset.length === 0 && (
              <span className="italic text-default-400 text-center block">
                No hay resultados...
              </span>
            )}
            <RadioGroup
              label={title}
              value={items.find((el) => el.selected)?.key ?? ""}
              className="max-h-56 overflow-auto"
              onValueChange={handleChangeValue}>
              {items.map((option) => (
                <RadioItem value={option.key}>{option.label}</RadioItem>
              ))}
            </RadioGroup>
          </section>
        </ModalBody>
        <ModalFooter>
          <MyButton variant="flat" onClick={handleClose}>
            Cancelar
          </MyButton>
          <MyButton color="primary" onClick={handleSelect}>
            Seleccionar
          </MyButton>
        </ModalFooter>
      </MyModal>
    </>
  )
}

function RadioItem({ children, ...props }: RadioProps) {
  return (
    <Radio
      {...props}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-transparent hover:bg-primary-100 items-center",
          "flex-row min-w-full cursor-pointer rounded-medium gap-2 p-2",
          "data-[selected=true]:bg-primary-100",
        ),
      }}>
      {children}
    </Radio>
  )
}
