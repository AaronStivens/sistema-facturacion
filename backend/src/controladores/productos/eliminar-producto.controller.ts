import { Request, Response } from "express";
import { eliminarProducto } from "../../servicios/producto/eliminar-producto.service";

export async function eliminarProductoController(
  req: Request<{}, {}, {}, { idproducto: number }>,
  res: Response,
) {
  try {
    const producto = await eliminarProducto(req.query.idproducto);

    res.status(producto.status).json({
      mensaje: producto.message,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      mensaje: "Error interno al eliminar el producto",
    });
  }
}
