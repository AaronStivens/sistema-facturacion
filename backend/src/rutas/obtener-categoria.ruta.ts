import { Router } from "express";
import { ObtenerCategoriasControlador } from "../controladores/categoria/obtener-categoria.controller";

const router = Router();


/**
 * @swagger
 * /api/categorias/obtener:
 *   get:
 *     summary: Obtener categorías
 *     description: Obtiene todas las categorías o una categoría específica mediante su ID.
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: query
 *         name: idcategoria
 *         required: false
 *         description: ID de la categoría que se desea consultar. Si se omite, devuelve todas las categorías.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Categorías obtenidas correctamente.
 *       400:
 *         description: El ID de la categoría no es válido.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/obtener", ObtenerCategoriasControlador);

export default router;