import conexion from "../../../base-datos/conexion";
import { IDetalle_ventas } from "../../../base-datos/interfaces/detalle_ventas.interface";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";

export async function anularFactura(idFactura: number) {
  const ValidarFactura = await conexion
    .from<IVentas>("ventas")
    .where("id_venta", idFactura)
    .first();

  if (ValidarFactura === null || ValidarFactura === undefined) {
    return { status: 400, message: "El id del producto es requerido" };
  }

  const EliminarFactura = await conexion
    .from<IVentas>("ventas")
    .where("id_venta", idFactura)
    .update({ estado: "anulada" });

  return { status: 200, message: "Factura anulada correctamente" };
}
