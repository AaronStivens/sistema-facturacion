
import { Router } from "express";
import { generarFacturaPDFControlador } from "../controladores/facturas/generar-pdf.controller";

const router = Router();

/**
 * @swagger
 * /api/facturas/{idFactura}/pdf:
 *   get:
 *     summary: Generar factura en PDF
 *     description: Genera la factura en formato carta o tirilla.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: idFactura
 *         required: true
 *         description: ID de la factura que se desea generar en PDF.
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: formato
 *         required: false
 *         description: Formato del documento PDF. Por defecto se utiliza carta.
 *         schema:
 *           type: string
 *           enum:
 *             - carta
 *             - tirilla
 *           default: carta
 *           example: carta
 *     responses:
 *       200:
 *         description: PDF de la factura generado correctamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: El ID de la factura o el formato no son válidos.
 *       404:
 *         description: La factura solicitada no existe.
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/:idFactura/pdf", generarFacturaPDFControlador);

export default router;
