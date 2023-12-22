interface AuthDataResponse {
  token: string
  usuario: AuthUser
  privilegios: Privileges
  formularios: UserForms[]
}

interface User {
  rut: string
  user: string
  correo: string
  nombres: string
  telefono: string
  id_usuario: number
  apellido_p: string
  apellido_m: string
}

interface AuthUser extends User {
  nombre_avatar: string
  nombre_completo: string
}

interface UserForms {
  ruta: string
  icono: string
  nombre: string
  hijos: UserForms[]
  identificador: string
  tipo: "link" | "module"
}

interface Privileges {
  inicio: PrivilegeItem
  ventas: PrivilegeItem
  guias_despacho: PrivilegeItem
  facturas_electronicas: PrivilegeItem
}

interface PrivilegeItem {
  ver: boolean
  crear: boolean
  editar: boolean
  borrar: boolean
}
