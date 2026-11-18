import conexion from "../../../base-datos/conexion";
import { ICliente } from "../../../base-datos/interfaces/clientes.interace";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";

export async function eliminarCliente(idCliente: number) {
    
  const InfoCliente = await conexion
  .from<ICliente>("clientes")
  .where("id_cliente", idCliente)
  .first();    

  if (!InfoCliente) return { status: 404, message: "El cliente no existe" };

  const ValidarFacturas = await conexion
    .from<IVentas>("ventas")
    .where("id_cliente", idCliente)
    .andWhere("estado", "<>", "anulada")
    .first();

  if (ValidarFacturas)
    return {
      status: 400,
      message:
        "No se puede eliminar el cliente porque tiene facturas asociadas",
    };

  await conexion("clientes").where("id_cliente", idCliente).delete();

  return { status: 200, message: "Cliente eliminado correctamente" };
}
