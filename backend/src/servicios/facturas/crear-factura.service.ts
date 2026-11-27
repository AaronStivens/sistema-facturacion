import { Decimal } from "decimal.js";
import { CrearFacturaDTO } from "../../DTO/crear-factura.dto";
import { IVentas } from "../../../base-datos/interfaces/ventas.interface";
import conexion from "../../../base-datos/conexion";
import { generarNumeroFactura } from "../../auxiliares/numero_factura";
import { ICliente } from "../../../base-datos/interfaces/clientes.interace";
import { IDetalle_ventas } from "../../../base-datos/interfaces/detalle_ventas.interface";

export async function crearFactura(body: CrearFacturaDTO) {  
    //Validar que se reciban productos
    if (body.productos.length === 0)
      return {
        status: 400,
        message: "por favor seleccione al menos 1 producto",
      };

    let Productos = [];

    for await (const item of body.productos) {
      const SubTotalPorProducto = new Decimal(item.cantidad)
        .mul(item.precio_unitario)
        .toFixed(2);

      Productos.push({
        id_producto: item.id_producto,
        nombre_producto: item.nombre_producto,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
        costo_unitario: item.costo_unitario,
        descuento: 0,
        subtotal: SubTotalPorProducto,
        id_venta: 0,
      });
    }

    //Calculamos SubTotal
    const SubTotal = Productos.reduce((acc, curr) => {
      return acc.plus(curr.subtotal);
    }, new Decimal(0));

    //Obtener descuento
    const Descuento = new Decimal(SubTotal)
      .mul(new Decimal(body.Descuento).div(100))
      .toFixed(2);
    const subtotalNeto = new Decimal(SubTotal).minus(Descuento).toFixed(2);

    //Obtener Impuesto
    const Impuestos = new Decimal(subtotalNeto ?? 0).mul(body.Impuesto ?? 0);
    const Total = new Decimal(subtotalNeto).plus(Impuestos).toFixed(2);

    const InfoCliente = await conexion
      .from<ICliente>("clientes")
      .where("id_cliente", body.id_cliente)
      .select("*")
      .first();

    const ClienteJson = {
      id_cliente: body.id_cliente,
      nombre: InfoCliente?.nombre ?? "",
      identificacion: InfoCliente?.identificacion ?? "",
      telefono: InfoCliente?.telefono ?? "",
      correo: InfoCliente?.correo ?? "",
      direccion: InfoCliente?.direccion ?? "",
    };

    const NuevaFactura: IVentas = {
      numero_factura: await generarNumeroFactura(),
      id_cliente: body.id_cliente,
      cliente_json: ClienteJson,
      id_usuario: body.id_usuario,
      fecha: new Date(),
      subtotal: new Decimal(subtotalNeto ?? 0).toNumber(),
      descuento: new Decimal(Descuento ?? 0).toNumber(),
      impuesto: new Decimal(Impuestos ?? 0).toNumber(),
      total: new Decimal(Total ?? 0).toNumber(),
      metodo_pago: body.metodo_pago,
    };

      const FacturaID = await conexion
      .from<IVentas>("ventas")
      .insert(NuevaFactura);


    const DetallesFactura = Productos.map((producto) => ({
      ...producto,
      subtotal: new Decimal(producto.subtotal ?? 0).toNumber(),
      id_venta: FacturaID[0],
    }));  

    const InsertarDetalle = await conexion
      .from<IDetalle_ventas>("detalle_venta")
      .insert(DetallesFactura);
        
    return {
      status: 200,
      message: "Factura creada con exito",
      Datos: FacturaID[0],
    };
  
}
