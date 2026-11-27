import { useEffect, useState } from "react";
import axios from "axios";
import { crearFactura, type IProductoFactura } from "../servicios/facturas";
import { obtenerClientes, type ICliente } from "../servicios/clientes";
import { obtenerProductos, type IProducto } from "../servicios/productos";
import "../estilos/crear-factura.css"
import { Decimal } from "decimal.js";

interface Props {
  onCerrar: () => void;
  onFacturaCreada: (mensaje: string) => void | Promise<void>;
}

interface IDetalle {
  id_producto: number;
  nombre_producto: string;
  cantidad: number;
  precio_unitario: number;
  costo_unitario: number;
  existencia: number;
}

function ModalNuevaFactura({ onCerrar, onFacturaCreada }: Props) {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [productos, setProductos] = useState<IProducto[]>([]);

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [detalles, setDetalles] = useState<IDetalle[]>([]);

  const [descuento, setDescuento] = useState("0");
  const [impuesto, setImpuesto] = useState("0");
  const [metodoPago, setMetodoPago] = useState<
    "Efectivo" | "Debito" | "Deposito"
  >("Efectivo");

  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      try {
        setCargandoDatos(true);

        const [datosClientes, datosProductos] = await Promise.all([
          obtenerClientes(),
          obtenerProductos(),
        ]);

        setClientes(datosClientes);
        setProductos(datosProductos);
      } catch (error) {
        console.error("Error al cargar datos de la factura:", error);
        setMensaje(
          obtenerMensajeError(
            error,
            "No se pudieron cargar los clientes y productos.",
          ),
        );
      } finally {
        setCargandoDatos(false);
      }
    }

    cargarDatos();
  }, []);

  function obtenerMensajeError(error: unknown, mensajePredeterminado: string) {
    if (axios.isAxiosError(error)) {
      const mensajeBackend = error.response?.data?.mensaje;

      return typeof mensajeBackend === "string"
        ? mensajeBackend
        : mensajePredeterminado;
    }

    return mensajePredeterminado;
  }

  function agregarProducto() {
    if (!productoSeleccionado) {
      setMensaje("Selecciona un producto para agregarlo.");
      return;
    }

    const producto = productos.find(
      (p) => p.id_producto === Number(productoSeleccionado),
    );

    if (!producto) {
      setMensaje("No se encontró el producto seleccionado.");
      return;
    }

    if (producto.existencia <= 0) {
      setMensaje("Este producto no tiene existencia disponible.");
      return;
    }

    const detalleExistente = detalles.find(
      (d) => d.id_producto === producto.id_producto,
    );

    if (detalleExistente) {
      if (detalleExistente.cantidad >= producto.existencia) {
        setMensaje("No hay más existencia disponible de este producto.");
        return;
      }

      setDetalles((actuales) =>
        actuales.map((detalle) =>
          detalle.id_producto === producto.id_producto
            ? { ...detalle, cantidad: detalle.cantidad + 1 }
            : detalle,
        ),
      );
    } else {
      setDetalles((actuales) => [
        ...actuales,
        {
          id_producto: producto.id_producto,
          nombre_producto: producto.nombre,
          cantidad: 1,
          precio_unitario: Number(producto.precio),
          costo_unitario: Number(producto.costo),
          existencia: producto.existencia,
        },
      ]);
    }

    setProductoSeleccionado("");
    setMensaje("");
  }

  function cambiarCantidad(idProducto: number, cantidad: number) {
    const detalle = detalles.find((d) => d.id_producto === idProducto);

    if (!detalle) return;

    if (cantidad < 1) return;

    if (cantidad > detalle.existencia) {
      setMensaje(
        `La existencia disponible de ${detalle.nombre_producto} es ${detalle.existencia}.`,
      );
      return;
    }

    setDetalles((actuales) =>
      actuales.map((item) =>
        item.id_producto === idProducto ? { ...item, cantidad } : item,
      ),
    );

    setMensaje("");
  }

  function quitarProducto(idProducto: number) {
    setDetalles((actuales) =>
      actuales.filter((item) => item.id_producto !== idProducto),
    );
  }

  // Cálculos usando Decimal para evitar errores de precisión.
  const subtotal = detalles.reduce(
    (acumulado, detalle) =>
      acumulado.plus(
        new Decimal(detalle.precio_unitario).times(detalle.cantidad),
      ),
    new Decimal(0),
  );

  const porcentajeDescuento = new Decimal(descuento === "" ? "0" : descuento);

  const porcentajeImpuesto = new Decimal(impuesto === "" ? "0" : impuesto);

  const montoDescuento = subtotal.times(porcentajeDescuento).dividedBy(100);

  const baseImponible = subtotal.minus(montoDescuento);

  const montoImpuesto = baseImponible.times(porcentajeImpuesto).dividedBy(100);

  const total = baseImponible.plus(montoImpuesto);

  function formatearMoneda(valor: Decimal) {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(valor.toNumber());
  }

  async function guardarFactura() {
    if (detalles.length === 0) {
      setMensaje("Agrega al menos un producto a la factura.");
      return;
    }

    if (
      !porcentajeDescuento.isFinite() ||
      porcentajeDescuento.isNegative() ||
      porcentajeDescuento.greaterThan(100)
    ) {
      setMensaje("El descuento debe estar entre 0 y 100 %.");
      return;
    }

    if (!porcentajeImpuesto.isFinite() || porcentajeImpuesto.isNegative()) {
      setMensaje("Ingresa un porcentaje de impuesto válido.");
      return;
    }

    try {
      setProcesando(true);
      setMensaje("");

      const productosFactura: IProductoFactura[] = detalles.map((detalle) => ({
        id_producto: detalle.id_producto,
        nombre_producto: detalle.nombre_producto,
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
        costo_unitario: detalle.costo_unitario,
      }));

      const respuesta = await crearFactura({
        id_usuario: 1,
        metodo_pago: metodoPago,
        Descuento: porcentajeDescuento.toNumber(),
        Impuesto: porcentajeImpuesto.dividedBy(100).toNumber(),
        id_cliente: clienteSeleccionado ? Number(clienteSeleccionado) : null,
        productos: productosFactura,
      });

      await onFacturaCreada(respuesta?.mensaje || "¡Factura creada con éxito!");
    } catch (error) {
      console.error("Error al crear factura:", error);

      setMensaje(
        obtenerMensajeError(error, "No se pudo registrar la factura."),
      );
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="factura-modal-fondo">
      <div className="factura-modal-contenido modal-nueva-factura">
        <div className="factura-modal-encabezado">
          <div>
            <h3>Nueva factura</h3>
            <p>Completa la información para registrar la venta.</p>
          </div>

          <button
            className="factura-modal-cerrar"
            onClick={onCerrar}
            disabled={procesando}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {mensaje && (
          <div className="nueva-factura-mensaje" role="alert">
            {mensaje}
            <button
              type="button"
              onClick={() => setMensaje("")}
              aria-label="Cerrar mensaje"
            >
              ×
            </button>
          </div>
        )}

        {cargandoDatos ? (
          <div className="nueva-factura-cargando">
            Cargando clientes y productos...
          </div>
        ) : (
          <>
            {/* Cliente */}
            <section className="nueva-factura-seccion">
              <h4>Información del cliente</h4>

              <div className="nueva-factura-campo">
                <label htmlFor="cliente-factura">Cliente</label>

                <select
                  id="cliente-factura"
                  value={clienteSeleccionado}
                  onChange={(e) => setClienteSeleccionado(e.target.value)}
                  disabled={procesando}
                >
                  <option value="">Consumidor final</option>

                  {clientes.map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.nombre}
                      {cliente.identificacion
                        ? ` - ${cliente.identificacion}`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* Productos */}
            <section className="nueva-factura-seccion">
              <h4>Productos</h4>

              <div className="nueva-factura-agregar-producto">
                <select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(e.target.value)}
                  disabled={procesando}
                >
                  <option value="">Selecciona un producto</option>

                  {productos.map((producto) => (
                    <option
                      key={producto.id_producto}
                      value={producto.id_producto}
                      disabled={producto.existencia <= 0}
                    >
                      {producto.nombre} — Existencia: {producto.existencia} —{" "}
                      {formatearMoneda(new Decimal(producto.precio))}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn-factura-agregar-producto"
                  onClick={agregarProducto}
                  disabled={procesando}
                >
                  Agregar
                </button>
              </div>

              <div className="nueva-factura-tabla-contenedor">
                <table className="nueva-factura-tabla">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {detalles.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="nueva-factura-vacio">
                          No has agregado productos.
                        </td>
                      </tr>
                    ) : (
                      detalles.map((detalle) => {
                        const subtotalProducto = new Decimal(
                          detalle.precio_unitario,
                        ).times(detalle.cantidad);

                        return (
                          <tr key={detalle.id_producto}>
                            <td>{detalle.nombre_producto}</td>

                            <td>
                              {formatearMoneda(
                                new Decimal(detalle.precio_unitario),
                              )}
                            </td>

                            <td>
                              <input
                                className="nueva-factura-cantidad"
                                type="number"
                                min="1"
                                max={detalle.existencia}
                                value={detalle.cantidad}
                                disabled={procesando}
                                onChange={(e) =>
                                  cambiarCantidad(
                                    detalle.id_producto,
                                    Number(e.target.value),
                                  )
                                }
                              />
                            </td>

                            <td>{formatearMoneda(subtotalProducto)}</td>

                            <td>
                              <button
                                type="button"
                                className="btn-factura-quitar"
                                onClick={() =>
                                  quitarProducto(detalle.id_producto)
                                }
                                disabled={procesando}
                                title="Quitar producto"
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pago y totales */}
            <section className="nueva-factura-seccion">
              <h4>Pago y totales</h4>

              <div className="nueva-factura-configuracion">
                <div className="nueva-factura-campo">
                  <label htmlFor="metodo-pago">Método de pago</label>

                  <select
                    id="metodo-pago"
                    value={metodoPago}
                    onChange={(e) =>
                      setMetodoPago(
                        e.target.value as "Efectivo" | "Debito" | "Deposito",
                      )
                    }
                    disabled={procesando}
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Debito">Débito</option>
                    <option value="Deposito">Depósito</option>
                  </select>
                </div>

                <div className="nueva-factura-campo">
                  <label htmlFor="descuento-factura">Descuento (%)</label>

                  <input
                    id="descuento-factura"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={descuento}
                    onChange={(e) => setDescuento(e.target.value)}
                    disabled={procesando}
                  />
                </div>

                <div className="nueva-factura-campo">
                  <label htmlFor="impuesto-factura">Impuesto (%)</label>

                  <input
                    id="impuesto-factura"
                    type="number"
                    min="0"
                    step="0.01"
                    value={impuesto}
                    onChange={(e) => setImpuesto(e.target.value)}
                    disabled={procesando}
                  />
                </div>
              </div>

              <div className="nueva-factura-resumen">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatearMoneda(subtotal)}</strong>
                </div>

                <div>
                  <span>Descuento</span>
                  <strong>- {formatearMoneda(montoDescuento)}</strong>
                </div>

                <div>
                  <span>Impuesto</span>
                  <strong>{formatearMoneda(montoImpuesto)}</strong>
                </div>

                <div className="nueva-factura-total">
                  <span>Total</span>
                  <strong>{formatearMoneda(total)}</strong>
                </div>
              </div>
            </section>
          </>
        )}

        <div className="factura-modal-acciones">
          <button
            type="button"
            className="btn-factura-cancelar"
            onClick={onCerrar}
            disabled={procesando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-factura-guardar"
            onClick={guardarFactura}
            disabled={procesando || cargandoDatos}
          >
            {procesando ? "Registrando..." : "Registrar factura"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNuevaFactura;
