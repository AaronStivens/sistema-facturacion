
import { Router } from "express";
import { obtenerFacturasController } from "../controladores/facturas/obtener-facturas.controller";

const router = Router();

/**
 * @swagger
 * /api/facturas/obtener:
 *   post:
 *     summary: Obtener facturas
 *     description: Recupera la lista de facturas o una factura específica.
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObtenerFacturasDTO'
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


router.post("/obtener", obtenerFacturasController);

export default router;
