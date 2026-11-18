import { Request, Response } from "express";
import { EditarClienteDTO } from "../../DTO/editar-cliente.dto";
import { editarCliente } from "../../servicios/cliente/editar-cliente.service";

export async function editarClientecontroller(
  req: Request<{}, {}, EditarClienteDTO>,
  res: Response,
) {
  try {
    const editarcliente = await editarCliente(req.body);
    res.status(editarcliente.status).json({
      mensaje: editarcliente.message,
    });
  } catch (error) {
    console.error("Error al editar cliente:", error);
    res.status(500).json({
      mensaje: "Error interno al editar el cliente",
    });
  }
}
