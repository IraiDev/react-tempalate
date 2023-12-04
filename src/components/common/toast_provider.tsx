import {
  IconAlertTriangle,
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react"
import { ToastContainer, TypeOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { twMerge } from "tailwind-merge"

const Icons: Record<TypeOptions, React.ReactNode> = {
  default: undefined,
  error: <IconExclamationCircle size={30} className="text-inherit" />,
  info: <IconInfoCircle size={30} className="text-inherit" />,
  success: <IconCircleCheck size={30} className="text-inherit" />,
  warning: <IconAlertTriangle size={30} className="text-inherit" />,
}

const toastStyles: Record<TypeOptions, string> = {
  default: "bg-default-200 border-2 border-default-300 text-default-600",
  error: "bg-danger-100 text-danger-600",
  info: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-warning-100 text-warning-600",
}

const buttonStyles: Record<TypeOptions, string> = {
  default: "hover:bg-default-200 text-inherit",
  error: "hover:bg-danger-200 text-inherit",
  info: "hover:bg-blue-200 text-inherit",
  success: "hover:bg-green-200 text-inherit",
  warning: "hover:bg-warning-200 text-inherit",
}

export function ToastProvider() {
  return (
    <ToastContainer
      toastClassName={(props) =>
        twMerge(
          "relative flex !p-0 min-h-10 rounded-large justify-between overflow-hidden cursor-pointer my-2",
          "bg-gradient-to-r transition-colors shadow-xl font-semibold",
          toastStyles[props?.type ?? "default"],
        )
      }
      bodyClassName="text-sm font-inherit p-3 flex gap-3 cursor-text"
      icon={({ type }) => Icons[type]}
      closeButton={({ type }) => (
        <button
          className={twMerge(
            "text-inherit h-6 w-6 rounded-full grid place-content-center",
            "transition-colors",
            "top-1.5 right-2 absolute",
            buttonStyles[type],
          )}>
          <IconX size={17} />
        </button>
      )}
      position="top-right"
      autoClose={3000}
      limit={10}
    />
  )
}
