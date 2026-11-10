import conexion from "../../../base-datos/conexion";
import { ICategoria } from "../../../base-datos/interfaces/categorias.interface";
import { IProductos } from "../../../base-datos/interfaces/productos.interface";

export async function EliminarCategoria(idcategoria:number){

    if(idcategoria === undefined || idcategoria === null) return { status: 400, message: "El id de la categoria es requerido" };

    const ValidarCategoria = await conexion
    .from<ICategoria>("categorias")
    .where("id_categoria", idcategoria)
    .first();

    if(!ValidarCategoria) return { status: 404, message: "La categoria no existe" };

    const ValidarProductos = await conexion
    .from<IProductos>("productos")
    .where("id_categoria", idcategoria)
    .first();

    if(ValidarProductos) return { status: 400, message: "No se puede eliminar la categoria porque tiene productos asociados" };

    await conexion("categorias").where("id_categoria", idcategoria).del();

    return { status: 200, message: "Categoria eliminada correctamente" };
}