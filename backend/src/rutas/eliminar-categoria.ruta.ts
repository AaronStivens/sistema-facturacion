import { Router } from "express";
import { EliminarCategoriaControlador } from "../controladores/categoria/eliminar-categoria.controller";

const router = Router();


/**
 * @swagger
 * /api/categorias/eliminar:
 *   delete:
 *     summary: Eliminar categoría
 *     description: Elimina una categoría específica mediante su ID.
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: query
 *         name: idcategoria
 *         required: false
 *         description: ID de la categoría que se desea eliminar. Si se omite, devuelve todas las categorías.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente.
 *       400:
 *         description: El ID de la categoría no es válido.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

router.delete("/eliminar", EliminarCategoriaControlador);

export default router;