export interface IClienteJson {
    id_cliente: number | null;
    nombre: string;
    identificacion: string | null;
    telefono: string | null;
    correo: string | null;
    direccion: string | null;
}

export interface IVentas {
id_venta?: number
numero_factura: string
id_cliente: number
id_usuario: number
fecha: Date
subtotal: number
descuento: number
impuesto: number
total: number
metodo_pago: string
estado?: string
cliente_json:IClienteJson
}