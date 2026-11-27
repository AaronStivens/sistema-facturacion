import conexion from "../../base-datos/conexion";
import { IVentas } from "../../base-datos/interfaces/ventas.interface";

export async function generarNumeroFactura(): Promise<string> {

    const obtenerFactura = await conexion
        .from<IVentas>("ventas")
        .select("numero_factura")
        .orderBy("id_venta", "desc")
        .first();

    let siguienteNumero = 1;

    if (obtenerFactura) {
        const numeroActual = Number(
            obtenerFactura.numero_factura.replace("FAC-", "")
        );

        siguienteNumero = numeroActual + 1;
    }

    return `FAC-${String(siguienteNumero).padStart(6, "0")}`;
}