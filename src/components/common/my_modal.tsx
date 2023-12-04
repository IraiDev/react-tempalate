import React from "react"
import { Modal, ModalProps, ModalContent, ModalHeader } from "@nextui-org/react"

interface Props extends Omit<ModalProps, "title" | "as" | "ref"> {
  ref?: React.RefObject<HTMLDivElement>
  onSubmit?(e: React.FormEvent): void
  as?: keyof JSX.IntrinsicElements
  title: string
}

export function MyModal({ ref, title, children, as = "div", onSubmit, ...props }: Props) {
  return (
    <Modal
      ref={ref}
      size="lg"
      placement="top"
      backdrop="opaque"
      shouldBlockScroll
      isDismissable={false}
      scrollBehavior="inside"
      isKeyboardDismissDisabled
      {...props}>
      <ModalContent as={as} onSubmit={onSubmit}>
        <ModalHeader className="text-2xl font-bold">{title}</ModalHeader>
        {children}
      </ModalContent>
    </Modal>
  )
}
