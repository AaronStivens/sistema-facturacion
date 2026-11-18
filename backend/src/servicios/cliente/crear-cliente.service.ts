import conexion from "../../../base-datos/conexion";
import { ICliente } from "../../../base-datos/interfaces/clientes.interace";
import { CrearClienteDTO } from "../../DTO/crear-cliente.dto";

export async function crearCliente(body: CrearClienteDTO) {
    
  const NuevoCliente: ICliente = {
    nombre: body.nombre.trim(),
    identificacion: body.identificacion.trim(),
    telefono: body.telefono.trim(),
    correo: body.correo || "",
    direccion: body.direccion || "",
    fecha_creacion: new Date(),
  };

  const ClienteID = await conexion<ICliente>("clientes").insert(NuevoCliente);

  return ClienteID;
}
