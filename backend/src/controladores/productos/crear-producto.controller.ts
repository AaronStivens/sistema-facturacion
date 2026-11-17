import { Request, Response } from "express";
import { CrearProductoDTO } from "../../DTO/crear-producto.dto";
import { crearProductos } from "../../servicios/producto/crear-producto.service";

export async function crearProductoControlador(req:Request<{}, {}, CrearProductoDTO>, res:Response){

    try {
        const productos = await crearProductos(req.body);
        res.status(201).json({
            mensaje: "Producto creado correctamente",
            datos: productos
        })
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({
            mensaje: "Error interno al crear el producto",
        });
    }
}