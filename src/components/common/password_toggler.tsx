import { ReactNode } from "react"
import { useToggle } from "@utils/hooks"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { DEFAULT_ICON_SIZE } from "@utils/constants"

interface Props {
  children(props: { type: "password" | "text"; Toggler: ReactNode }): ReactNode
}

export function PasswordToggler({ children }: Props) {
  const [show, handleToggle] = useToggle()

  return (
    <>
      {children({
        type: show ? "text" : "password",
        Toggler: (
          <button type="button" onClick={handleToggle} className="text-default-500">
            {show ? <IconEyeOff size={DEFAULT_ICON_SIZE} /> : <IconEye size={DEFAULT_ICON_SIZE} />}
          </button>
        ),
      })}
    </>
  )
}
