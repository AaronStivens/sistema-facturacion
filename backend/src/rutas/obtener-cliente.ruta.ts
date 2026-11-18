import { Router } from "express";
import { obtenerClienteController } from "../controladores/cliente/obtener-cliente.controller";

const router = Router();


/**
 * @swagger
 * /api/clientes/obtener:
 *   get:
 *     summary: Obtener clientes
 *     description: Obtiene todos los clientes o un cliente específico mediante su ID.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: query
 *         name: idcliente
 *         required: false
 *         description: ID del cliente que se desea consultar. Si se omite, devuelve todos los clientes.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Clientes obtenidos correctamente.
 *       400:
 *         description: El ID del cliente no es válido.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/obtener", obtenerClienteController);

export default router;