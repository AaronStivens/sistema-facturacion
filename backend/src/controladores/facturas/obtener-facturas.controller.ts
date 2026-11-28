import { Request, Response } from "express";
import { obtenerFacturas } from "../../servicios/facturas/obtener-facturas.service";
import { ObtenerFacturasDTO } from "../../DTO/obtener-facturas.dto";

export async function obtenerFacturasController(
    req:Request <ObtenerFacturasDTO>,
    res:Response
){
    try {
        const Facturas = await obtenerFacturas(req.body)

        res.status(200).json({
            mensaje: "Facturas obtenidas correctamente",
            datos: Facturas
        });
    } catch (error) {
        console.log("Error al obtener facturas:", error);

        res.status(500).json({
            mensaje: "Error interno al obtener las facturas"
        });
    }
}