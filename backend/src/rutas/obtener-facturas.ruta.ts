
import { Router } from "express";
import { obtenerFacturasController } from "../controladores/facturas/obtener-facturas.controller";

const router = Router();

/**
 * @swagger
 * /api/facturas/obtener:
 *   get:
 *     summary: Obtener facturas
 *     description: Recupera la lista de facturas o un facturas específica.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: query
 *         name: idFactura
 *         required: false
 *         description: ID de la factura que se desea consultar. Si se omite, devuelve todos las facturas.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Facturas obtenidas correctamente.
 *       400:
 *         description: El ID de la factura no es válido.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */


router.get("/obtener", obtenerFacturasController);

export default router;
