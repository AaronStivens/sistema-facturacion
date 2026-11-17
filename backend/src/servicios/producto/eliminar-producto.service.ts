import conexion from "../../../base-datos/conexion";
import { IProductos } from "../../../base-datos/interfaces/productos.interface";

export async function eliminarProducto(idProducto: number) {
  console.log('idProducto: ', idProducto);

  if (idProducto === undefined || idProducto === null)    
    return { status: 400, message: "El id del producto es requerido" };

  const ValidarProducto = await conexion
    .from<IProductos>("productos")
    .where("id_producto", idProducto)
    .first();

  if (!ValidarProducto)
    return { status: 404, message: "El producto no existe" };

  await conexion("productos").where("id_producto", idProducto).delete();

  return { status: 200, message: "Producto eliminado correctamente" };
}
