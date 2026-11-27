
import { Router } from "express";
import { crearFacturaController } from "../controladores/facturas/crear-factura.controller";

const router = Router();

/**
 * @swagger
 * /api/facturas/crear:
 *   post:
 *     summary: Crear una factura
 *     description: Registra una nueva factura.
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearFacturaDTO'
 *     responses:
 *       201:
 *         description: Factura creada correctamente. 
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/crear", crearFacturaController);

export default router;
