export function authUserAdapter(data: any): Omit<AuthDataResponse, "token"> {
  const nombre_completo = `${data?.usuario?.nombres.split(" ")?.[0] ?? "Sin"} ${
    data?.usuario?.apellido_p?.[0] ?? "Nombre"
  }.`
  const nombre_avatar = `${data?.usuario?.nombres?.[0] ?? "N"}${
    data?.usuario?.apellido_p?.[0] ?? "N"
  }`

  return {
    usuario: {
      apellido_p: data?.usuario?.apellido_p ?? "",
      apellido_m: data?.usuario?.apellido_m ?? "",
      id_usuario: data?.usuario?.id_usuario ?? 0,
      telefono: data?.usuario?.telefono ?? "",
      nombres: data?.usuario?.nombres ?? "",
      correo: data?.usuario?.correo ?? "",
      user: data?.usuario?.user ?? "",
      rut: data?.usuario?.rut ?? "",
      nombre_completo,
      nombre_avatar,
    },
    formularios: formAdapater(data?.formularios),
    privilegios: {
      inicio: {
        editar: data?.privilegios?.inicio?.editar ?? false,
        borrar: data?.privilegios?.inicio?.borrar ?? false,
        crear: data?.privilegios?.inicio?.crear ?? false,
        ver: data?.privilegios?.inicio?.ver ?? false,
      },
      ventas: {
        editar: data?.privilegios?.ventas?.editar ?? false,
        borrar: data?.privilegios?.ventas?.borrar ?? false,
        crear: data?.privilegios?.ventas?.crear ?? false,
        ver: data?.privilegios?.ventas?.ver ?? false,
      },
      guias_despacho: {
        editar: data?.privilegios?.guias_despacho?.editar ?? false,
        borrar: data?.privilegios?.guias_despacho?.borrar ?? false,
        crear: data?.privilegios?.guias_despacho?.crear ?? false,
        ver: data?.privilegios?.guias_despacho?.ver ?? false,
      },
      facturas_electronicas: {
        editar: data?.privilegios?.facturas_electronicas?.editar ?? false,
        borrar: data?.privilegios?.facturas_electronicas?.borrar ?? false,
        crear: data?.privilegios?.facturas_electronicas?.crear ?? false,
        ver: data?.privilegios?.facturas_electronicas?.ver ?? false,
      },
    },
  }
}

function formAdapater(array: any[]): any[] {
  return (
    array.map((item: any) => ({
      identificador: item?.identificador ?? "",
      hijos: formAdapater(item?.hijos) ?? [],
      nombre: item?.nombre ?? "",
      icono: item?.icono ?? "",
      ruta: item?.ruta ?? "",
      tipo: item?.tipo ?? "",
    })) ?? []
  )
}
