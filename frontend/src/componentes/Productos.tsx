import { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
  type IProducto,
} from "../servicios/productos";
import { obtenerCategorias, type ICategoria } from "../servicios/categoria";
import axios from "axios";
import "../estilos/Productos.css";

function Productos() {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState<number | null>(null);

  const [codigo, setCodigo] = useState("");
  const [id_categoria, setIdCategoria] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [costo, setCosto] = useState("");
  const [existencia, setExistencia] = useState("");

  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error">("exito");

  async function cargarProductos() {
    try {
      setCargando(true);
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      mostrarNotificacion(
        obtenerMensajeError(error, "No se pudieron cargar los productos."),
        "error",
      );
    } finally {
      setCargando(false);
    }
  }

  async function cargarCategorias() {
    try {
      const datos = await obtenerCategorias();
      setCategorias(datos);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      mostrarNotificacion(
        obtenerMensajeError(error, "No se pudieron cargar las categorías."),
        "error",
      );
    }
  }

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  function limpiarFormulario() {
    setCodigo("");
    setIdCategoria("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCosto("");
    setExistencia("");
  }

  async function guardarProducto() {
    const precioNumero = Number(precio);
    const costoNumero = Number(costo);
    const existenciaNumero = Number(existencia);

    if (
      !codigo.trim() ||
      !id_categoria ||
      !nombre.trim() ||
      precio.trim() === "" ||
      costo.trim() === "" ||
      existencia.trim() === ""
    ) {
      mostrarNotificacion("Completa todos los campos obligatorios.", "error");
      return;
    }

    if (
      !Number.isFinite(precioNumero) ||
      !Number.isFinite(costoNumero) ||
      precioNumero < 0 ||
      costoNumero < 0
    ) {
      mostrarNotificacion(
        "El precio y el costo deben ser números válidos mayores o iguales a cero.",
        "error",
      );
      return;
    }

    if (!Number.isInteger(existenciaNumero) || existenciaNumero < 0) {
      mostrarNotificacion(
        "La existencia debe ser un número entero mayor o igual a cero.",
        "error",
      );
      return;
    }

    try {
      setProcesando(true);

      await crearProducto({
        codigo: codigo.trim(),
        id_categoria: Number(id_categoria),
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || undefined,
        precio: precioNumero,
        costo: costoNumero,
        existencia: existenciaNumero,
      });

      limpiarFormulario();
      setMostrarFormulario(false);

      mostrarNotificacion("¡Producto creado con éxito!", "exito");
      await cargarProductos();
    } catch (error) {
      console.error("Error al crear producto:", error);
      mostrarNotificacion(
        obtenerMensajeError(error, "No se pudo crear el producto."),
        "error",
      );
    } finally {
      setProcesando(false);
    }
  }

  async function borrarProducto() {
    if (productoEliminar === null) return;

    try {
      setProcesando(true);

      await eliminarProducto(productoEliminar);
      setProductoEliminar(null);

      mostrarNotificacion("¡Producto eliminado con éxito!", "exito");
      await cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      mostrarNotificacion(
        obtenerMensajeError(error, "No se pudo eliminar el producto."),
        "error",
      );
    } finally {
      setProcesando(false);
    }
  }

  function mostrarNotificacion(texto: string, tipo: "exito" | "error") {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje("");
    }, 3500);
  }

  function obtenerMensajeError(error: unknown, mensajePredeterminado: string) {
    if (axios.isAxiosError(error)) {
      const mensajeBackend = error.response?.data?.mensaje;

      return typeof mensajeBackend === "string"
        ? mensajeBackend
        : mensajePredeterminado;
    }

    return mensajePredeterminado;
  }

  function obtenerNombreCategoria(id: number) {
    return (
      categorias.find((categoria) => categoria.id_categoria === id)?.nombre ||
      "Categoría no encontrada"
    );
  }

  return (
    <div className="productos">
      <div className="productos-encabezado">
        <div>
          <h3>Productos</h3>
          <p>Administra los productos de tu inventario.</p>
        </div>

        <button
          className="btn-agregar-producto"
          onClick={() => {
            setMensaje("");
            setMostrarFormulario(true);
          }}
        >
          + Nuevo producto
        </button>
      </div>

      {mensaje && (
        <div
          className={`notificacion ${tipoMensaje}`}
          role={tipoMensaje === "error" ? "alert" : "status"}
        >
          <span className="notificacion-icono">
            {tipoMensaje === "exito" ? "✓" : "!"}
          </span>

          <span>{mensaje}</span>

          <button
            className="notificacion-cerrar"
            onClick={() => setMensaje("")}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      )}

      <div className="productos-tabla-contenedor">
        <table className="productos-tabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Costo</th>
              <th>Existencia</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cargando ? (
              <tr>
                <td colSpan={8} className="productos-vacios">
                  Cargando productos...
                </td>
              </tr>
            ) : productos.length === 0 ? (
              <tr>
                <td colSpan={8} className="productos-vacios">
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion || "Sin descripción"}</td>
                  <td>{obtenerNombreCategoria(producto.id_categoria)}</td>
                  <td>${Number(producto.precio).toFixed(2)}</td>
                  <td>${Number(producto.costo).toFixed(2)}</td>
                  <td>{producto.existencia}</td>
                  <td>
                    <div className="productos-acciones">
                      <button
                        className="btn-editar-producto"
                        disabled
                        title="Próximamente"
                      >
                        Editar
                      </button>

                      <button
                        className="btn-eliminar-producto"
                        onClick={() => {
                          setMensaje("");
                          setProductoEliminar(producto.id_producto);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear producto */}
      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-contenido modal-producto">
            <div className="modal-encabezado">
              <h3>Nuevo producto</h3>

              <button
                className="modal-cerrar"
                onClick={() => setMostrarFormulario(false)}
                disabled={procesando}
              >
                ×
              </button>
            </div>

            <div className="producto-formulario-grid">
              <div className="campo-producto">
                <label>Código *</label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ej. P-1"
                  maxLength={50}
                />
              </div>

              <div className="campo-producto">
                <label>Categoría *</label>
                <select
                  value={id_categoria}
                  onChange={(e) => setIdCategoria(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-producto campo-producto-completo">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Laptop Lenovo"
                  maxLength={150}
                />
              </div>

              <div className="campo-producto campo-producto-completo">
                <label>Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción del producto"
                />
              </div>

              <div className="campo-producto">
                <label>Precio *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="campo-producto">
                <label>Costo *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={costo}
                  onChange={(e) => setCosto(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="campo-producto">
                <label>Existencia *</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={existencia}
                  onChange={(e) => setExistencia(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="modal-acciones">
              <button
                className="btn-cancelar"
                onClick={() => setMostrarFormulario(false)}
                disabled={procesando}
              >
                Cancelar
              </button>

              <button
                className="btn-guardar"
                onClick={guardarProducto}
                disabled={procesando}
              >
                {procesando ? "Guardando..." : "Guardar producto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación */}
      {productoEliminar !== null && (
        <div className="modal-fondo">
          <div className="modal-contenido modal-confirmacion">
            <div className="modal-icono-eliminar">!</div>

            <h3>¿Eliminar producto?</h3>

            <p>
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no
              se puede deshacer.
            </p>

            <div className="modal-acciones">
              <button
                className="btn-cancelar"
                onClick={() => setProductoEliminar(null)}
                disabled={procesando}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar-eliminar"
                onClick={borrarProducto}
                disabled={procesando}
              >
                {procesando ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;
