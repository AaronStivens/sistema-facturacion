import { Request, Response } from "express";
import { obtenerCategoria } from "../../servicios/categoria/obtener-categoria.service";

export async function ObtenerCategoriasControlador(req: Request<{}, {}, {}, { idcategoria?: number }>, res: Response){

    try{
        const ObtenetCategorias = await obtenerCategoria(req.query.idcategoria ? Number(req.query.idcategoria) : undefined);
        
        res.status(200).json({
            mensaje: "Categorias obtenidas correctamente",
            datos: ObtenetCategorias
        });
    } catch (error) {
        console.log("Error al obtener categorias:", error);

        res.status(500).json({
            mensaje: "Error interno al obtener las categorias"
        });
    }
}