import conexion from "../../../base-datos/conexion";
import { ICategoria } from "../../../base-datos/interfaces/categorias.interface";
import { CrearCategoriaDTO } from "../../DTO/crear-categoria.dto";

export async function crearCategoria(datos: CrearCategoriaDTO) {
  const NuevaCategoria: ICategoria = {
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion || "",
  };

  const CategoriaID = await conexion("categorias").insert(NuevaCategoria);

  return CategoriaID;
}
