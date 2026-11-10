import { useEffect, useState } from "react";
import {
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
  type ICategoria,
} from "../servicios/categoria";
import axios from "axios";
import "../estilos/Categorias.css";

function Categorias() {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaEliminar, setCategoriaEliminar] = useState<number | null>(
    null,
  );

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error">("exito");

  async function cargarCategorias() {
    try {
      setCargando(true);
      const datos = await obtenerCategorias();
      setCategorias(datos);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      setMensaje("No se pudieron cargar las categorías.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function guardarCategoria() {
    if (!nombre.trim()) {
      mostrarNotificacion("El nombre de la categoría es obligatorio.", "error");
      return;
    }

    try {
      setProcesando(true);

      await crearCategoria({
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || undefined,
      });

      setNombre("");
      setDescripcion("");
      setMostrarFormulario(false);

      mostrarNotificacion("¡Categoría creada con éxito!", "exito");

      await cargarCategorias();
    } catch (error) {
      console.error("Error al crear categoría:", error);

      mostrarNotificacion(
        obtenerMensajeError(error, "No se pudo crear la categoría."),
        "error",
      );
    } finally {
      setProcesando(false);
    }
  }

  async function borrarCategoria() {
    if (categoriaEliminar === null) return;

    try {
      setProcesando(true);

      await eliminarCategoria(categoriaEliminar);

      setCategoriaEliminar(null);

      mostrarNotificacion("¡Categoría eliminada con éxito!", "exito");

      await cargarCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);

      mostrarNotificacion(
        obtenerMensajeError(error, "No se pudo eliminar la categoría."),
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
      return error.response?.data?.mensaje || mensajePredeterminado;
    }

    return mensajePredeterminado;
  }

  return (
    <div className="categorias">
      <div className="categorias-encabezado">
        <div>
          <h3>Categorías</h3>
          <p>Administra las categorías de tus productos.</p>
        </div>

        <button
          className="btn-agregar-categoria"
          onClick={() => {
            setMensaje("");
            setMostrarFormulario(true);
          }}
        >
          + Nueva categoría
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

      <div className="categorias-tabla-contenedor">
        <table className="categorias-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cargando ? (
              <tr>
                <td colSpan={4} className="categorias-vacias">
                  Cargando categorías...
                </td>
              </tr>
            ) : categorias.length === 0 ? (
              <tr>
                <td colSpan={4} className="categorias-vacias">
                  No hay categorías registradas.
                </td>
              </tr>
            ) : (
              categorias.map((categoria) => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion || "Sin descripción"}</td>
                  <td>
                    <button
                      className="btn-eliminar-categoria"
                      onClick={() => {
                        setMensaje("");
                        setCategoriaEliminar(categoria.id_categoria);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear categoría */}
      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <div className="modal-encabezado">
              <h3>Nueva categoría</h3>

              <button
                className="modal-cerrar"
                onClick={() => setMostrarFormulario(false)}
                disabled={procesando}
              >
                ×
              </button>
            </div>

            <div className="campo-categoria">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Computadoras"
                maxLength={100}
              />
            </div>

            <div className="campo-categoria">
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la categoría"
                maxLength={255}
              />
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
                onClick={guardarCategoria}
                disabled={procesando}
              >
                {procesando ? "Guardando..." : "Guardar categoría"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación */}
      {categoriaEliminar !== null && (
        <div className="modal-fondo">
          <div className="modal-contenido modal-confirmacion">
            <div className="modal-icono-eliminar">!</div>

            <h3>¿Eliminar categoría?</h3>

            <p>
              ¿Estás seguro de que deseas eliminar esta categoría? Esta acción
              no se puede deshacer.
            </p>

            <div className="modal-acciones">
              <button
                className="btn-cancelar"
                onClick={() => setCategoriaEliminar(null)}
                disabled={procesando}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar-eliminar"
                onClick={borrarCategoria}
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

export default Categorias;
