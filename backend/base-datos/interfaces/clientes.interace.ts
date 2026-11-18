
export interface ICliente {
  id_cliente?: number;
  nombre: string;
  identificacion: string;
  telefono: string ;
  correo: string;
  direccion: string;
  activo?: boolean;
  fecha_creacion: Date;
}
