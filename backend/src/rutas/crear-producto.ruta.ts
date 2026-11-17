
import { Router } from "express";
import { crearProductoControlador } from "../controladores/productos/crear-producto.controller";

const router = Router();

/**
 * @swagger
 * /api/productos/crear:
 *   post:
 *     summary: Crear un producto
 *     description: Registra un nuevo producto en el sistema.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearProductoDTO'
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 *       409:
 *         description: Ya existe un producto con ese nombre.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/crear", crearProductoControlador);

export default router;
