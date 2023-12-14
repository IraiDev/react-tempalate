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
import { useCallback, useMemo, useRef, useState } from "react"
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
  const initialItems = useMemo(
    () => dataset.map((el) => ({ ...el, selected: selected === el.key })),
    [dataset, selected],
  )
  const selectedKey = useRef(selected ?? "")
  const { isOpen, onOpenChange } = useDisclosure()
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<Item[]>(initialItems)

  const handleChangeValue = (key: string) => {
    selectedKey.current = key
    setItems((prev) => prev.map((el) => ({ ...el, selected: key === el.key })))
  }

  const handleSelect = () => {
    onSelect?.(selectedKey.current)
    onOpenChange()
    setInputValue("")
  }

  const handleClose = () => {
    setItems(initialItems)
    onOpenChange()
    setInputValue("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const filterItems = useCallback((currentItems: Item[], inputValue: string) => {
    if (inputValue === "") {
      return currentItems
    }
    return currentItems.filter(
      (el) =>
        el.key.includes(inputValue) ||
        el.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
    )
  }, [])

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
          <MyInput
            autoFocus
            name="q"
            value={inputValue}
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Buscar..."
            onChange={handleInputChange}
            endContent={<IconSearch size={DEFAULT_ICON_SIZE} />}
          />
          <section className="p-2 pb-0">
            {filterItems(items, inputValue).length === 0 && (
              <span className="italic text-default-400 text-center block">
                No hay resultados...
              </span>
            )}
            <RadioGroup
              label={title}
              value={items.find((el) => el.selected)?.key ?? ""}
              className="max-h-56 overflow-auto"
              onValueChange={handleChangeValue}>
              {filterItems(items, inputValue).map((option) => (
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
