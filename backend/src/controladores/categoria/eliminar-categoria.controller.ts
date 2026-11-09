import { Request, Response } from "express";
import { EliminarCategoria } from "../../servicios/categoria/eliminar-categoria.service";

export async function EliminarCategoriaControlador(req: Request<{}, {}, {}, { idcategoria: number }>, res: Response){

    try{
        const categoria = await EliminarCategoria(req.query.idcategoria);

        res.status(categoria.status).json({
            mensaje: categoria.message
        });
    }catch(error){
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({
            mensaje: "Error interno al eliminar la categoría"
        });
    }
}