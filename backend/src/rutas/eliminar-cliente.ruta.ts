import { Router } from "express";
import { eliminarClienteController } from "../controladores/cliente/eliminar-cliente.controller";

const router = Router();

/**
 * @swagger
 * /api/clientes/eliminar:
 *   delete:
 *     summary: Eliminar cliente
 *     description: Elimina un clientes específico mediante su ID.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: query
 *         name: idCliente
 *         required: true
 *         description: ID de cliente que desea eliminar.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: cliente eliminado correctamente.
 *       400:
 *         description: El ID del cliente no es válido.
 *       404:
 *         description: cliente no se puede eliminar.
 *       500:
 *         description: Error interno del servidor.
 */

router.delete("/eliminar", eliminarClienteController);

export default router;