import { Router } from "express";
import { anularFacturaController } from "../controladores/facturas/anular-factura.controller";

const router = Router();

/**
 * @swagger
 * /api/facturas/anular:
 *   delete:
 *     summary: Anular factura
 *     description: Anular una factura.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: query
 *         name: idFactura
 *         required: false
 *         description: ID de la factura a anular.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Factura anulada correctamente.
 *       400:
 *         description: El ID de la factura no es válido.
 *       404:
 *         description: Factura no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.delete("/eliminar", anularFacturaController);

export default router;