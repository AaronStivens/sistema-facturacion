import conexion from "../../../base-datos/conexion";
import { ICliente } from "../../../base-datos/interfaces/clientes.interace";

//Ejemplo para refactorizar
export async function obtenerClientes(
  idCliente?: number,
): Promise<ICliente | ICliente[] | null> {

  if (idCliente === undefined || idCliente === null) {

    const ObtenerCliente = await conexion.from<ICliente>("clientes")            

    return ObtenerCliente ?? [];
  }

  const ObtenerClientes = await conexion<ICliente>("clientes").where("id_cliente", idCliente).select("*").first();

  return ObtenerClientes ?? null;
}
