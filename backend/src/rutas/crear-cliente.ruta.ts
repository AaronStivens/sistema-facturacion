
import { Router } from "express";
import { crearClienteController } from "../controladores/cliente/crear-cliente.controller";

const router = Router();

/**
 * @swagger
 * /api/clientes/crear:
 *   post:
 *     summary: Crear un cliente
 *     description: Registra un nuevo cliente en el sistema.
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearClienteDTO'
 *     responses:
 *       201:
 *         description: Cliente creado correctamente. 
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/crear", crearClienteController);

export default router;
