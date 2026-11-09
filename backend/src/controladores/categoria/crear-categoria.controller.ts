import { Request, Response } from "express";
import { CrearCategoriaDTO } from "../../DTO/crear-categoria.dto";
import { crearCategoria } from "../../servicios/categoria/crear-categoria.service";

export async function crearCategoriaControlador(
  req: Request<{}, {}, CrearCategoriaDTO>,
  res: Response,
): Promise<void> {
  try {
    const categoria = await crearCategoria(req.body);

    res.status(201).json({
      mensaje: "Categoría creada correctamente",
      datos: categoria,
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);

    res.status(500).json({
      mensaje: "Error interno al crear la categoría",
    });
  }
}