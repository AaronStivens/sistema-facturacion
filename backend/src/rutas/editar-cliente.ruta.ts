import { Router } from "express";
import { editarClientecontroller } from "../controladores/cliente/editar-cliente.controller";

const router = Router();

/**
 * @swagger
 * /api/cliente/editar:
 *   put:
 *     summary: Editar un producto
 *     description: Edita un producto existente en el sistema.
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditarClienteDTO'
 *     responses:
 *       201:
 *         description: Cliente editado correctamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/editar", editarClientecontroller);

export default router;
