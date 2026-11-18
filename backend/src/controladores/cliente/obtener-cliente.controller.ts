import { Request, Response } from "express";
import { obtenerClientes } from "../../servicios/cliente/obtener-cliente.service";

export async function obtenerClienteController(
  req: Request<{}, {}, {}, { idcliente?: number }>,
  res: Response,
) {
  try {
    const ObtenerCliente = await obtenerClientes(
      req.query.idcliente ? Number(req.query.idcliente) : undefined,
    );
    res.status(200).json({
      mensaje: "Clientes obtenidos correctamente",
      datos: ObtenerCliente,
    });
  } catch (error) {
    console.log("Error al obtener clientes:", error);

    res.status(500).json({
      mensaje: "Error interno al obtener los clientes",
    });
  }
}
