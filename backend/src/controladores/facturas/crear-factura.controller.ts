import { Request, Response } from "express";
import { CrearFacturaDTO } from "../../DTO/crear-factura.dto";
import { crearFactura } from "../../servicios/facturas/crear-factura.service";

export async function crearFacturaController(
    req:Request<CrearFacturaDTO>,
    res:Response
){
    try {
        const CrearFactura = await crearFactura(req.body)
         res.status(200).json({
            mensaje: "Factura creada",
            datos: CrearFactura
        });        
    } catch (error) {
        
    }
}