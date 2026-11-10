import api from "./api";

export interface ICategoria {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
}

// Obtener todas las categorías
export async function obtenerCategorias() {
  const respuesta = await api.get("/categorias/obtener");

  return respuesta.data.datos;
}

// Obtener una categoría por ID
export async function obtenerCategoria(id: number) {
  const respuesta = await api.get("/categorias/obtener", {
    params: {
      idcategoria: id,
    },
  });

  return respuesta.data.datos;
}

// Crear una categoría
export async function crearCategoria(datos: {
  nombre: string;
  descripcion?: string;
}) {
  const respuesta = await api.post("/categorias/crear", datos);

  return respuesta.data;
}

// Eliminar una categoría
export async function eliminarCategoria(id: number) {
  const respuesta = await api.delete("/categorias/eliminar", {
    params: {
      idcategoria: id
    }
  });

  return respuesta.data;
}
