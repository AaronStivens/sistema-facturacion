import {
  Users,
  FileText,
  Package,
  ChartNoAxesCombined
} from "lucide-react";

import "../estilos/MenuSuperior.css";

interface MenuSuperiorProps {
  opcionActiva: string;
  cambiarOpcion: (opcion: string) => void;
}

function MenuSuperior({ opcionActiva, cambiarOpcion }: MenuSuperiorProps) {
  const opciones = [
    { nombre: "Clientes", Icono: Users },
    { nombre: "Facturas", Icono: FileText },
    { nombre: "Inventario", Icono: Package },
    { nombre: "Reporte venta", Icono: ChartNoAxesCombined }
  ];

  return (
    <nav className="menu-superior">
      {opciones.map((opcion) => {
        const Icono = opcion.Icono;

        return (
          <button
            key={opcion.nombre}
            className={`menu-opcion ${
              opcionActiva === opcion.nombre ? "activa" : ""
            }`}
            onClick={() => cambiarOpcion(opcion.nombre)}
          >
            <Icono size={22} strokeWidth={1.8} />
            <span>{opcion.nombre}</span>
            <span className="indicador-activo"></span>
          </button>
        );
      })}
    </nav>
  );
}

export default MenuSuperior;