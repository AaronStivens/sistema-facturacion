import conexion from "../../../base-datos/conexion";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";

export async function obtenerFacturas(idFactura?: number): Promise<IVentas | IVentas[]> {

  if (idFactura !== undefined) {
    const factura = await conexion
      .from<IVentas>("ventas")
      .where("id_venta", idFactura)
      .select("*")
      .first();

    return factura ?? [];
  }

  const facturas = await conexion.from<IVentas>("ventas").select("*");

  return facturas;
}
