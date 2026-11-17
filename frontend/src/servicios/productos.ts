
import api from "./api";

export interface IProducto {
    id_producto: number;
    codigo: string;
    id_categoria: number;
    nombre: string;
    descripcion: string | null;
    precio: number;
    costo: number;
    existencia: number;
}

export async function obtenerProductos(): Promise<IProducto[]> {
    const respuesta = await api.get("/productos/obtener");
    return respuesta.data.datos;
}

export async function crearProducto(datos: {
    codigo: string;
    id_categoria: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    costo: number;
    existencia: number;
}) {
    const respuesta = await api.post("/productos/crear", datos);
    return respuesta.data;
}

export async function eliminarProducto(id: number) {
    const respuesta = await api.delete("/productos/eliminar", {
        params: { idproducto: id }
    });

    return respuesta.data;
}
