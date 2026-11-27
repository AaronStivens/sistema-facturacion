import { Request, Response } from "express";
import { CrearFacturaDTO } from "../../DTO/crear-factura.dto";
import { crearFactura } from "../../servicios/facturas/crear-factura.service";

export async function crearFacturaController(
  req: Request<CrearFacturaDTO>,
  res: Response,
) {
  const CrearFactura = await crearFactura(req.body);

  res.status(CrearFactura.status).json({
      mensaje: CrearFactura.message,
    });
}
