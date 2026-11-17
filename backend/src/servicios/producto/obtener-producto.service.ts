import conexion from "../../../base-datos/conexion";
import { IProductos } from "../../../base-datos/interfaces/productos.interface";

export async function ObtenerProductos(
  idProducto?: number,
) : Promise<IProductos | IProductos[] | null> {
  if (idProducto !== undefined) {
    const producto = await conexion<IProductos>("productos")
      .where("id_producto", idProducto)
      .first();

    return producto ?? null;
  }

  const productos = await conexion<IProductos>("productos").select("*");
  
  return productos;
}
