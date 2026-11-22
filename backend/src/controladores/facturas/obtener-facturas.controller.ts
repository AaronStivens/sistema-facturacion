import { Request, Response } from "express";
import { obtenerFacturas } from "../../servicios/facturas/obtener-facturas.service";

export async function obtenerFacturasController(
    req:Request <{}, {}, {idFactura:number}>,
    res:Response
){
    try {
        const Facturas = await obtenerFacturas(req.query.idFactura ? Number(req.query.idFactura): undefined)

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