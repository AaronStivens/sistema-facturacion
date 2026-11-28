import { Decimal } from "decimal.js";
import conexion from "../../../base-datos/conexion";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";
import { IDetalle_ventas } from "../../../base-datos/interfaces/detalle_ventas.interface";
import { generarPDF } from "../../configuracion/puppeteer";
import { formatearNumero } from "../../auxiliares/separador-miles";

type FormatoPDF = "carta" | "tirilla";

export async function generarFacturaPDF(
  idFactura: number,
  formato: FormatoPDF,
): Promise<Uint8Array> {
  const factura = await conexion
    .from<IVentas>("ventas")
    .where("id_venta", idFactura)
    .first();

  if (!factura) {
    throw new Error("La factura solicitada no existe");
  }

  const detalles = await conexion
    .from<IDetalle_ventas>("detalle_venta")
    .where("id_venta", idFactura)
    .select("*");

  if (detalles.length === 0) {
    throw new Error("La factura no tiene detalles registrados");
  }

  const datosPDF = {
    numero_factura: factura.numero_factura,

    fecha: new Date(factura.fecha).toLocaleDateString("es-HN"),

    metodo_pago: factura.metodo_pago,

    cliente: factura.cliente_json,

    productos: detalles.map((item) => ({
      codigo: item.id_producto,
      nombre_producto: item.nombre_producto,
      cantidad: item.cantidad,
      precio_unitario: formatearNumero(item.precio_unitario ?? 0),
      subtotal: formatearNumero(item.subtotal ?? 0),
    })),

    subtotal: formatearNumero(factura.subtotal ?? 0),
    descuento: formatearNumero(factura.descuento ?? 0),
    impuesto: formatearNumero(factura.impuesto ?? 0),
    total: formatearNumero(factura.total ?? 0),
  };
  const plantilla =
    formato === "carta"
      ? "../../plantillas/factura-carta.html"
      : "facturas/tirilla.html";

  const opciones =
    formato === "carta"
      ? {
          formato: "letter" as const,
        }
      : {
          ancho: "80mm",
          alto: "200mm",
          margenes: {
            superior: "3mm",
            inferior: "3mm",
            izquierdo: "3mm",
            derecho: "3mm",
          },
        };
  
  return await generarPDF(plantilla, datosPDF, opciones);
}
