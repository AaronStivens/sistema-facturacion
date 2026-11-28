import { Decimal } from "decimal.js";
import conexion from "../../../base-datos/conexion";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";
import { ObtenerFacturasDTO } from "../../DTO/obtener-facturas.dto";

export async function obtenerFacturas(
  body: ObtenerFacturasDTO,
): Promise<IVentas | IVentas[]> {
  if (body.idFactura !== undefined) {
    const factura = await conexion
      .from<IVentas>("ventas")
      .where("id_venta", body.idFactura)
      .andWhere((builder) => {
        if (body.fechainicio) {
          builder.andWhere("fecha", ">=", body.fechainicio);
        }

        if (body.fechafinal) {
          builder.andWhere("fecha", "<=", body.fechafinal);
        }
      })
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

  const facturas = await conexion
    .from<IVentas>("ventas")
    .andWhere((builder) => {
      if (body.fechainicio) {
        builder.andWhere("fecha", ">=", body.fechainicio);
      }

      if (body.fechafinal) {
        builder.andWhere("fecha", "<=", body.fechafinal);
      }
    })
    .select("*");

  facturas.forEach((factura) => {
    factura.descuento = new Decimal(factura.descuento ?? 0).toNumber();
    factura.impuesto = new Decimal(factura.impuesto ?? 0).toNumber();
    factura.subtotal = new Decimal(factura.subtotal ?? 0).toNumber();
    factura.total = new Decimal(factura.total ?? 0).toNumber();
  });

  return facturas;
}
