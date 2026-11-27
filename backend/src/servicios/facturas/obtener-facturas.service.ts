import { Decimal } from "decimal.js";
import conexion from "../../../base-datos/conexion";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";

export async function obtenerFacturas(
  idFactura?: number,
): Promise<IVentas | IVentas[]> {
  if (idFactura !== undefined) {
    const factura = await conexion
      .from<IVentas>("ventas")
      .where("id_venta", idFactura)
      .select("*")
      .first();

    if (factura) {
      factura.descuento = new Decimal(factura.descuento ?? 0).toNumber();
      factura.impuesto = new Decimal(factura.impuesto ?? 0).toNumber();
      factura.subtotal = new Decimal(factura.subtotal ?? 0).toNumber();
      factura.total = new Decimal(factura.total ?? 0).toNumber();
    }

    return factura ?? [];
  }

  const facturas = await conexion.from<IVentas>("ventas").select("*");

  facturas.forEach((factura) => {
    factura.descuento = new Decimal(factura.descuento ?? 0).toNumber();
    factura.impuesto = new Decimal(factura.impuesto ?? 0).toNumber();
    factura.subtotal = new Decimal(factura.subtotal ?? 0).toNumber();
    factura.total = new Decimal(factura.total ?? 0).toNumber();
  });

  return facturas;
}
