
import api from "./api";

export interface ICliente {
    id_cliente: number;
    nombre: string;
    identificacion: string | null;
    telefono: string | null;
    correo: string | null;
    direccion: string | null;
}

export async function obtenerClientes(): Promise<ICliente[]> {
    const respuesta = await api.get("/clientes/obtener");
    return respuesta.data.datos;
}

export async function obtenerCliente(id: number): Promise<ICliente> {
    const respuesta = await api.get("/clientes/obtener", {
        params: { idCliente: id }
    });

    return respuesta.data.datos;
}

export async function crearCliente(datos: {
    nombre: string;
    identificacion?: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
}) {
    const respuesta = await api.post("/clientes/crear", datos);
    return respuesta.data;
}

export async function editarCliente(datos: {
    id_cliente: number;
    nombre: string;
    identificacion?: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
}) {
    const respuesta = await api.put("/clientes/editar", datos);
    return respuesta.data;
}

export async function eliminarCliente(id: number) {
    const respuesta = await api.delete("/clientes/eliminar", {
        params: { idCliente: id }
    });

    return respuesta.data;
}
