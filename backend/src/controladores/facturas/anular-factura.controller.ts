import { Request, Response } from "express";
import { anularFactura } from "../../servicios/facturas/anular-factura.service";

export async function anularFacturaController(
  req: Request<{}, {}, {}, { idFactura: number }>,
  res: Response,
) {
  try {
    const anularfactura = await anularFactura(req.query.idFactura);

    res.status(anularfactura.status).json({
      mensaje: anularfactura.message,
    });
  } catch (error) {
    console.error("Error al anular:", error);
    res.status(500).json({
      mensaje: "Error interno al anular el producto",
    });
  }
}
