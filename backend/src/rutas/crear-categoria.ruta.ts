
import { Router } from "express";
import { crearCategoriaControlador } from "../controladores/categoria/crear-categoria.controller";

const router = Router();

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una categoría
 *     description: Registra una nueva categoría en el sistema.
 *     tags:
 *       - Categorías
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearCategoriaDTO'
 *     responses:
 *       201:
 *         description: Categoría creada correctamente.
 *       409:
 *         description: Ya existe una categoría con ese nombre.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", crearCategoriaControlador);

export default router;
