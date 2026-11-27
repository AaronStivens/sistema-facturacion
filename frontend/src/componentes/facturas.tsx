import { useEffect, useState } from "react";
import axios from "axios";
import {
    obtenerFacturas,
    eliminarFactura,
    type IFactura
} from "../servicios/facturas";
import "../estilos/facturas.css"
import ModalNuevaFactura from "../componentes/crear-factura"

function Facturas() {
    const [facturas, setFacturas] = useState<IFactura[]>([]);
    const [busqueda, setBusqueda] = useState("");

    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);

    const [facturaEliminar, setFacturaEliminar] = useState<IFactura | null>(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error">("exito");

    async function cargarFacturas() {
        try {
            setCargando(true);

            const datos = await obtenerFacturas();
            setFacturas(datos);
        } catch (error) {
            console.error("Error al obtener facturas:", error);

            mostrarNotificacion(
                obtenerMensajeError(error, "No se pudieron cargar las facturas."),
                "error"
            );
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarFacturas();
    }, []);

    function mostrarNotificacion(
        texto: string,
        tipo: "exito" | "error"
    ) {
        setMensaje(texto);
        setTipoMensaje(tipo);

        setTimeout(() => {
            setMensaje("");
        }, 3500);
    }

    function obtenerMensajeError(
        error: unknown,
        mensajePredeterminado: string
    ) {
        if (axios.isAxiosError(error)) {
            const mensajeBackend = error.response?.data?.mensaje;

            return typeof mensajeBackend === "string"
                ? mensajeBackend
                : mensajePredeterminado;
        }

        return mensajePredeterminado;
    }

    async function borrarFactura() {
        if (facturaEliminar === null) return;

        try {
            setProcesando(true);

            await eliminarFactura(facturaEliminar.id_venta);

            setFacturaEliminar(null);

            mostrarNotificacion(
                "¡Factura eliminada con éxito!",
                "exito"
            );

            await cargarFacturas();
        } catch (error) {
            console.error("Error al anular factura:", error);

            mostrarNotificacion(
                obtenerMensajeError(error, "No se pudo anular la factura."),
                "error"
            );
        } finally {
            setProcesando(false);
        }
    }

    function formatearFecha(fecha: string) {
        return new Date(fecha).toLocaleDateString("es-HN", {
            timeZone: "America/Tegucigalpa",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    function formatearMoneda(valor: number) {
        return new Intl.NumberFormat("es-HN", {
            style: "currency",
            currency: "HNL"
        }).format(valor);
    }

    const facturasFiltradas = facturas.filter(factura => {
        const termino = busqueda.toLowerCase().trim();

        return (
            factura.numero_factura.toLowerCase().includes(termino) ||
            (factura.cliente_json?.nombre || "Consumidor final")
                .toLowerCase()
                .includes(termino) ||
            factura.metodo_pago.toLowerCase().includes(termino) ||
            factura.estado.toLowerCase().includes(termino)
        );
    });

    return (
        <div className="facturas">
            <div className="facturas-encabezado">
                <div>
                    <h3>Facturas</h3>
                    <p>Consulta y administra las facturas registradas.</p>
                </div>

                <button
                    className="btn-agregar-factura"
                    onClick={() => setMostrarFormulario(true)}
                >
                    + Nueva factura
                </button>
            </div>

            {mensaje && (
                <div
                    className={`factura-notificacion ${tipoMensaje}`}
                    role={tipoMensaje === "error" ? "alert" : "status"}
                >
                    <span className="factura-notificacion-icono">
                        {tipoMensaje === "exito" ? "✓" : "!"}
                    </span>

                    <span>{mensaje}</span>

                    <button
                        className="factura-notificacion-cerrar"
                        onClick={() => setMensaje("")}
                        aria-label="Cerrar notificación"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="facturas-filtros">
                <input
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar por factura, cliente, método de pago o estado..."
                />
            </div>

            <div className="facturas-tabla-contenedor">
                <table className="facturas-tabla">
                    <thead>
                        <tr>
                            <th>Número de factura</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Método de pago</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan={7} className="facturas-vacias">
                                    Cargando facturas...
                                </td>
                            </tr>
                        ) : facturasFiltradas.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="facturas-vacias">
                                    {busqueda
                                        ? "No se encontraron facturas con esa búsqueda."
                                        : "No hay facturas registradas."}
                                </td>
                            </tr>
                        ) : (
                            facturasFiltradas.map(factura => (
                                <tr key={factura.id_venta}>
                                    <td className="factura-numero">
                                        {factura.numero_factura}
                                    </td>

                                    <td>
                                        {factura.cliente_json?.nombre || "Consumidor final"}
                                    </td>

                                    <td>{formatearFecha(factura.fecha)}</td>

                                    <td className="factura-total">
                                        {formatearMoneda(factura.total)}
                                    </td>

                                    <td>{factura.metodo_pago}</td>

                                    <td>
                                        <span
                                            className={`factura-estado ${factura.estado}`}
                                        >
                                            {factura.estado === "completada"
                                                ? "Completada"
                                                : "Anulada"}
                                        </span>
                                    </td>

                                    <td>
                                       <div className="facturas-acciones">
                                            <button
                                                className="btn-ver-pdf"
                                                onClick={() => {}}
                                            >
                                                Ver PDF
                                            </button>

                                            <button
                                                className="btn-eliminar-factura"
                                                onClick={() => {
                                                    setMensaje("");
                                                    setFacturaEliminar(factura);
                                                }}
                                                disabled={factura.estado === "anulada"}
                                                title={
                                                    factura.estado === "anulada"
                                                        ? "Esta factura ya está anulada"
                                                        : "Anular factura"
                                                }
                                            >
                                                Anular
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de nueva factura: construiremos el formulario en el siguiente paso */}
         {mostrarFormulario && (
                <ModalNuevaFactura
                    onCerrar={() => setMostrarFormulario(false)}
                    onFacturaCreada={async (mensaje) => {
                        setMostrarFormulario(false);
                        await cargarFacturas();
                        mostrarNotificacion(mensaje, "exito");
                    }}
                />
            )}

            {/* Modal para confirmar eliminación */}
            {facturaEliminar !== null && (
                <div className="factura-modal-fondo">
                    <div className="factura-modal-contenido factura-modal-confirmacion">
                        <div className="factura-modal-icono-eliminar">!</div>

                        <h3>Anular factura?</h3>

                        <p>
                            ¿Estás seguro de que deseas anular la factura{" "}
                            <strong>{facturaEliminar.numero_factura}</strong>?
                            Esta acción no se puede deshacer.
                        </p>

                        <div className="factura-modal-acciones">
                            <button
                                className="btn-factura-cancelar"
                                onClick={() => setFacturaEliminar(null)}
                                disabled={procesando}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-factura-confirmar-eliminar"
                                onClick={borrarFactura}
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

export default Facturas;