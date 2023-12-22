import { useNavigate } from "react-router-dom"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User, cn } from "@nextui-org/react"
import { IconLogout2, IconSelector } from "@tabler/icons-react"
import { privateRoutes } from "@configs/routes"
import { DEFAULT_ICON_SIZE } from "@utils/constants"
import { useAuthStore } from "../stores"

export function AuthUserDropdown() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const handleNavigate = () => {
    navigate(`/${privateRoutes.logout}`)
  }

  return (
    <Dropdown placement="top-start">
      <DropdownTrigger
        className={cn(
          "p-3 transition-transform bg-gradient-to-r rounded-2xl ring-2",
          "from-primary-700 to-primary-600 text-primary-200 ring-transparent",
          "hover:ring-primary-800 hover:cursor-pointer transition-all",
        )}>
        <div className="flex items-center justify-between gap-4">
          <User
            name={user?.nombre_completo.toLocaleLowerCase()}
            description={"usuario"}
            classNames={{
              name: "font-semibold capitalize",
              description: "text-primary-400",
            }}
            avatarProps={{
              name: user?.nombre_avatar.toLocaleUpperCase(),
              size: "md",
              classNames: {
                name: "text-base font-semibold text-primary-200",
                base: "bg-primary-900",
              },
            }}
          />
          <figure>
            <IconSelector size={DEFAULT_ICON_SIZE} />
          </figure>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="user-menu">
        <DropdownItem
          key="logout"
          onClick={handleNavigate}
          startContent={<IconLogout2 size={DEFAULT_ICON_SIZE} />}>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
