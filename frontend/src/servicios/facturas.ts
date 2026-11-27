
import api from "./api";

export interface IProductoFactura {
    id_producto: number;
    nombre_producto: string;
    cantidad: number;
    precio_unitario: number;
    costo_unitario: number;
}

export interface IFactura {
    id_venta: number;
    numero_factura: string;
    id_cliente: number | null;
    cliente_json: {
        nombre: string;
        identificacion: string | null;
        telefono: string | null;
        correo: string | null;
        direccion: string | null;
    };
    fecha: string;
    subtotal: number;
    descuento: number;
    impuesto: number;
    total: number;
    metodo_pago: string;
    estado: "completada" | "anulada";
}

export interface ICrearFactura {
    id_usuario: number;
    metodo_pago: "Efectivo" | "Debito" | "Deposito";
    Descuento: number;
    Impuesto: number;
    id_cliente?: number | null;
    productos: IProductoFactura[];
}

// Registrar factura
export async function crearFactura(datos: ICrearFactura) {
    const respuesta = await api.post("/facturas/crear", datos);
    return respuesta.data;
}

// Obtener una factura
export async function obtenerFactura(id: number) {
    const respuesta = await api.get("/facturas/obtener", {
        params: { idFactura: id }
    });

    return respuesta.data.datos;
}

// Eliminar factura
export async function eliminarFactura(id: number) {
    const respuesta = await api.delete("/facturas/eliminar", {
        params: { idFactura: id }
    });

    return respuesta.data;
}

// Obtener todas las facturas
export async function obtenerFacturas(): Promise<IFactura[]> {
    const respuesta = await api.get("/facturas/obtener");
    return respuesta.data.datos;
}