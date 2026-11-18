import { Request, Response } from "express";
import { eliminarCliente } from "../../servicios/cliente/eliminar-cliente.service";

export async function eliminarClienteController(
  req: Request<{}, {}, {}, { idCliente: number }>,
  res: Response,
) {
  try {
    const eliminarcliente = await eliminarCliente(req.query.idCliente);

    res.status(eliminarcliente.status).json({
      mensaje: eliminarcliente.message,
    });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({
      mensaje: "Error interno al eliminar el cliente",
    });
  }
}
