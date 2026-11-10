
import { useState } from "react";
import MenuSuperior from "../componentes/MenuSuperior";
import "../estilos/Inicio.css";
import Inventario from "./Inventario";

function Inicio() {
  const [opcionActiva, setOpcionActiva] = useState("Clientes");

  return (
    <div className="pagina-inicio">
      <header className="barra-sistema">
        <h1>Sistema de Facturación</h1>
      </header>

      <MenuSuperior
        opcionActiva={opcionActiva}
        cambiarOpcion={setOpcionActiva}
      />

      <main className="contenido-principal">
        {opcionActiva === "Inventario" ? (
          <Inventario />
        ) : (
          <>
            <h2>{opcionActiva}</h2>
            <p>Bienvenido al módulo de {opcionActiva.toLowerCase()}.</p>
          </>
        )}
      </main>
    </div>
  );
}

export default Inicio;
