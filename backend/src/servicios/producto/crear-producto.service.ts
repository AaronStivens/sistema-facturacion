import conexion from "../../../base-datos/conexion";
import { IProductos } from "../../../base-datos/interfaces/productos.interface";
import { CrearProductoDTO } from "../../DTO/crear-producto.dto";

export async function crearProductos(datos: CrearProductoDTO){

    const NuevoProducto = {
        codigo: datos.codigo.trim(),
        id_categoria: datos.id_categoria,
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion,
        precio: datos.precio,
        costo: datos.costo,
        existencia: datos.existencia,
        fecha_creacion: new Date(),
    }
    const ProductoID = await conexion
    .from<IProductos>("productos")
    .insert(NuevoProducto);

    return ProductoID;
}