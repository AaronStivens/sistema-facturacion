import conexion from "../../../base-datos/conexion";
import { ICliente } from "../../../base-datos/interfaces/clientes.interace";

export async function obtenerClientes(idCliente?: number): Promise<ICliente[]> {
  
  const consulta = conexion.from<ICliente>("clientes").select("*");

  if (idCliente !== undefined) {
    const cliente = await consulta.where("id_cliente", idCliente).first();

    return cliente ? [cliente] : [];
  }

  return await consulta;
}
