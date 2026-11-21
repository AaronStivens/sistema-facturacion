
import { useEffect, useState } from "react";
import {
    obtenerClientes,
    crearCliente,
    editarCliente,
    eliminarCliente,
    type ICliente
} from "../servicios/clientes";
import axios from "axios";
import "../estilos/clientes.css";

function Clientes() {
    const [clientes, setClientes] = useState<ICliente[]>([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [clienteEditar, setClienteEditar] = useState<number | null>(null);
    const [clienteEliminar, setClienteEliminar] = useState<number | null>(null);

    const [nombre, setNombre] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");

    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error">("exito");

    async function cargarClientes() {
        try {
            setCargando(true);
            const datos = await obtenerClientes();
            setClientes(datos);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            mostrarNotificacion(
                obtenerMensajeError(error, "No se pudieron cargar los clientes."),
                "error"
            );
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarClientes();
    }, []);

    function limpiarFormulario() {
        setNombre("");
        setIdentificacion("");
        setTelefono("");
        setCorreo("");
        setDireccion("");
        setClienteEditar(null);
    }

    function abrirFormularioCrear() {
        limpiarFormulario();
        setMensaje("");
        setMostrarFormulario(true);
    }

    async function abrirFormularioEditar(id: number) {
        try {
            setProcesando(true);
            setMensaje("");

            const cliente = clientes.find(c => c.id_cliente === id);

            if (!cliente) {
                mostrarNotificacion("No se encontró el cliente seleccionado.", "error");
                return;
            }

            setClienteEditar(cliente.id_cliente);
            setNombre(cliente.nombre);
            setIdentificacion(cliente.identificacion || "");
            setTelefono(cliente.telefono || "");
            setCorreo(cliente.correo || "");
            setDireccion(cliente.direccion || "");

            setMostrarFormulario(true);
        } catch (error) {
            console.error("Error al cargar cliente:", error);
            mostrarNotificacion(
                obtenerMensajeError(error, "No se pudo cargar el cliente."),
                "error"
            );
        } finally {
            setProcesando(false);
        }
    }

    async function guardarCliente() {
        if (!nombre.trim()) {
            mostrarNotificacion("El nombre del cliente es obligatorio.", "error");
            return;
        }

        if (correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            mostrarNotificacion("Ingresa un correo electrónico válido.", "error");
            return;
        }

        try {
            setProcesando(true);

            const datos = {
                nombre: nombre.trim(),
                identificacion: identificacion.trim() || undefined,
                telefono: telefono.trim() || undefined,
                correo: correo.trim() || undefined,
                direccion: direccion.trim() || undefined
            };

            if (clienteEditar !== null) {
                await editarCliente({
                    id_cliente: clienteEditar,
                    ...datos
                });

                mostrarNotificacion("¡Cliente actualizado con éxito!", "exito");
            } else {
                await crearCliente(datos);

                mostrarNotificacion("¡Cliente creado con éxito!", "exito");
            }

            limpiarFormulario();
            setMostrarFormulario(false);

            await cargarClientes();
        } catch (error) {
            console.error("Error al guardar cliente:", error);
            mostrarNotificacion(
                obtenerMensajeError(
                    error,
                    clienteEditar !== null
                        ? "No se pudo actualizar el cliente."
                        : "No se pudo crear el cliente."
                ),
                "error"
            );
        } finally {
            setProcesando(false);
        }
    }

    async function borrarCliente() {
        if (clienteEliminar === null) return;

        try {
            setProcesando(true);

            await eliminarCliente(clienteEliminar);
            setClienteEliminar(null);

            mostrarNotificacion("¡Cliente eliminado con éxito!", "exito");

            await cargarClientes();
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            mostrarNotificacion(
                obtenerMensajeError(error, "No se pudo eliminar el cliente."),
                "error"
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

    return (
        <div className="clientes">
            <div className="clientes-encabezado">
                <div>
                    <h3>Clientes</h3>
                    <p>Administra la información de tus clientes.</p>
                </div>

                <button
                    className="btn-agregar-cliente"
                    onClick={abrirFormularioCrear}
                >
                    + Nuevo cliente
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

            <div className="clientes-tabla-contenedor">
                <table className="clientes-tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan={6} className="clientes-vacios">
                                    Cargando clientes...
                                </td>
                            </tr>
                        ) : clientes?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="clientes-vacios">
                                    No hay clientes registrados.
                                </td>
                            </tr>
                        ) : (
                            clientes.map(cliente => (
                                <tr key={cliente.id_cliente}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.identificacion || "—"}</td>
                                    <td>{cliente.telefono || "—"}</td>
                                    <td>{cliente.correo || "—"}</td>
                                    <td>{cliente.direccion || "—"}</td>
                                    <td>
                                        <div className="clientes-acciones">
                                            <button
                                                className="btn-editar-cliente"
                                                onClick={() => abrirFormularioEditar(cliente.id_cliente)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn-eliminar-cliente"
                                                onClick={() => {
                                                    setMensaje("");
                                                    setClienteEliminar(cliente.id_cliente);
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

            {/* Modal para crear o editar cliente */}
            {mostrarFormulario && (
                <div className="modal-fondo">
                    <div className="modal-contenido modal-cliente">
                        <div className="modal-encabezado">
                            <h3>
                                {clienteEditar !== null ? "Editar cliente" : "Nuevo cliente"}
                            </h3>

                            <button
                                className="modal-cerrar"
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    limpiarFormulario();
                                }}
                                disabled={procesando}
                            >
                                ×
                            </button>
                        </div>

                        <div className="cliente-formulario-grid">
                            <div className="campo-cliente">
                                <label>Nombre *</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    placeholder="Nombre del cliente"
                                    maxLength={150}
                                />
                            </div>

                            <div className="campo-cliente">
                                <label>Identificación</label>
                                <input
                                    type="text"
                                    value={identificacion}
                                    onChange={e => setIdentificacion(e.target.value)}
                                    placeholder="Número de identificación"
                                    maxLength={30}
                                />
                            </div>

                            <div className="campo-cliente">
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    value={telefono}
                                    onChange={e => setTelefono(e.target.value)}
                                    placeholder="Número de teléfono"
                                    maxLength={20}
                                />
                            </div>

                            <div className="campo-cliente">
                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    value={correo}
                                    onChange={e => setCorreo(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    maxLength={150}
                                />
                            </div>

                            <div className="campo-cliente campo-cliente-completo">
                                <label>Dirección</label>
                                <textarea
                                    value={direccion}
                                    onChange={e => setDireccion(e.target.value)}
                                    placeholder="Dirección del cliente"
                                    maxLength={255}
                                />
                            </div>
                        </div>

                        <div className="modal-acciones">
                            <button
                                className="btn-cancelar"
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    limpiarFormulario();
                                }}
                                disabled={procesando}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-guardar"
                                onClick={guardarCliente}
                                disabled={procesando}
                            >
                                {procesando
                                    ? "Guardando..."
                                    : clienteEditar !== null
                                        ? "Guardar cambios"
                                        : "Guardar cliente"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para confirmar eliminación */}
            {clienteEliminar !== null && (
                <div className="modal-fondo">
                    <div className="modal-contenido modal-confirmacion">
                        <div className="modal-icono-eliminar">!</div>

                        <h3>¿Eliminar cliente?</h3>

                        <p>
                            ¿Estás seguro de que deseas eliminar este cliente?
                            Esta acción no se puede deshacer.
                        </p>

                        <div className="modal-acciones">
                            <button
                                className="btn-cancelar"
                                onClick={() => setClienteEliminar(null)}
                                disabled={procesando}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-confirmar-eliminar"
                                onClick={borrarCliente}
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

export default Clientes;
