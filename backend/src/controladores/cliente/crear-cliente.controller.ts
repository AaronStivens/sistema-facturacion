import { Request, Response } from "express";
import { CrearClienteDTO } from "../../DTO/crear-cliente.dto";
import { crearCliente } from "../../servicios/cliente/crear-cliente.service";

export async function crearClienteController(
  req: Request<{}, {}, CrearClienteDTO>,
  res: Response,
) {
  try {
    const Cliente = await crearCliente(req.body);
    res.status(201).json({
      mensaje: "Cliente creado correctamente",
      datos: Cliente,
    });
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).json({
      mensaje: "Error al crear el cliente",
    });
  }
}
