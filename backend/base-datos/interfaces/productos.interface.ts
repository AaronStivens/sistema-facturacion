export interface IProductos {
id_producto?: number;
codigo: string;
id_categoria: number;
nombre: string;
descripcion: string;
precio: number;
costo: number;
existencia: number;
fecha_creacion: Date;
}