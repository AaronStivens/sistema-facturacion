import { Request, Response } from "express";
import { ObtenerProductos } from "../../servicios/producto/obtener-producto.service";

export async function ObtenerProductosController(
  req: Request<{}, {}, {}, { idproducto?: number }>,
  res: Response,
) {
  try {
    const ObtenerProducto = await ObtenerProductos(
      req.query.idproducto ? Number(req.query.idproducto) : undefined,
    );

    res.status(200).json({
      mensaje: "Productos obtenidos correctamente",
      datos: ObtenerProducto,
    });
  } catch (error) {
    console.log("Error al obtener productos:", error);
    res.status(500).json({
      mensaje: "Error interno al obtener los productos",
    });
  }
}
