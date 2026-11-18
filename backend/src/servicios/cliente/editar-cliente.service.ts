import conexion from "../../../base-datos/conexion";
import { ICliente } from "../../../base-datos/interfaces/clientes.interace";
import { EditarClienteDTO } from "../../DTO/editar-cliente.dto";

export async function editarCliente(body: EditarClienteDTO){

    const InfoCliente = await conexion
    .from<ICliente>("clientes")
    .where("id_cliente", body.id_cliente)
    .first();

    if(!InfoCliente) return { status: 404, message: "El cliente no existe" };

    await conexion("clientes").where("id_cliente", body.id_cliente).update(body);

    return { status: 200, message: "Cliente editado correctamente" };
}