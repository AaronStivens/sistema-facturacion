export interface IDetalle_ventas {
  id_detalle?: number;
  id_venta: number;
  id_producto: number;
  nombre_producto: string;
  cantidad: number;
  precio_unitario: number;
  costo_unitario?: number;
  descuento?: number;
  subtotal: number;
}
