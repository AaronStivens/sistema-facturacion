
import { useState } from "react";
import "../estilos/Inventario.css";

function Inventario() {
  const [seccionActiva, setSeccionActiva] = useState("productos");

  return (
    <div className="inventario">      

      <div className="inventario-pestanas">
        <button
          className={seccionActiva === "productos" ? "pestana activa" : "pestana"}
          onClick={() => setSeccionActiva("productos")}
        >
          Productos
        </button>

        <button
          className={seccionActiva === "categorias" ? "pestana activa" : "pestana"}
          onClick={() => setSeccionActiva("categorias")}
        >
          Categorías
        </button>
      </div>

      <div className="inventario-contenido">
        {seccionActiva === "productos" ? (
          <div>
            <h3>Gestión de productos</h3>
            <p>Aquí podrás registrar y administrar los productos.</p>
          </div>
        ) : (
          <div>
            <h3>Gestión de categorías</h3>
            <p>Aquí podrás crear y administrar las categorías.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventario;
