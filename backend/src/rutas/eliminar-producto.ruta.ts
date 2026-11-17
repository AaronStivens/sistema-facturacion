import { Router } from "express";
import { eliminarProductoController } from "../controladores/productos/eliminar-producto.controller";

const router = Router();

/**
 * @swagger
 * /api/productos/eliminar:
 *   delete:
 *     summary: Eliminar producto
 *     description: Elimina un producto específico mediante su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: query
 *         name: idproducto
 *         required: false
 *         description: ID del producto que se desea eliminar. Si se omite, devuelve todos los productos.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       400:
 *         description: El ID del producto no es válido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.delete("/eliminar", eliminarProductoController);

export default router;