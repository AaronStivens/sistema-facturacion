
import { Router } from "express";
import { ObtenerProductosController } from "../controladores/productos/obtener-producto.controller";

const router = Router();

/**
 * @swagger
 * /api/productos/obtener:
 *   get:
 *     summary: Obtener productos
 *     description: Recupera la lista de productos o un producto específico.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: query
 *         name: idproducto
 *         required: false
 *         description: ID del producto que se desea consultar. Si se omite, devuelve todos los productos.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente.
 *       400:
 *         description: El ID del producto no es válido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


router.get("/obtener", ObtenerProductosController);

export default router;
