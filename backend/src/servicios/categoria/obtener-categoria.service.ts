
import conexion from "../../../base-datos/conexion";
import { ICategoria } from "../../../base-datos/interfaces/categorias.interface";

export async function obtenerCategoria(
  idCategoria?: number
): Promise<ICategoria | ICategoria[] | null> {

  if (idCategoria !== undefined) {
    const categoria = await conexion<ICategoria>("categorias")
      .where("id_categoria", idCategoria)
      .first();

    return categoria ?? null;
  }

  const categorias = await conexion<ICategoria>("categorias").select("*");

  return categorias;
}
