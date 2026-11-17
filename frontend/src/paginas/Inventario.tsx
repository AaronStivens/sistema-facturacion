import { useState } from "react";
import "../estilos/Inventario.css";
import Categorias from "../componentes/Categorias";
import Productos from "../componentes/Productos";

function Inventario() {
  const [seccionActiva, setSeccionActiva] = useState("productos");

  return (
    <div className="inventario">
      <div className="inventario-pestanas">
        <button
          className={
            seccionActiva === "productos" ? "pestana activa" : "pestana"
          }
          onClick={() => setSeccionActiva("productos")}
        >
          Productos
        </button>

        <button
          className={
            seccionActiva === "categorias" ? "pestana activa" : "pestana"
          }
          onClick={() => setSeccionActiva("categorias")}
        >
          Categorías
        </button>
      </div>

      <div className="inventario-contenido">
        {seccionActiva === "productos" ? <Productos /> : <Categorias />}
      </div>
    </div>
  );
}

export default Inventario;
