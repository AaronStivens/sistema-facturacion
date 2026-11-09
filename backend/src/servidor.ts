import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import documentacionSwagger from "./configuracion/swagger";
import conexion from "../base-datos/conexion";
import "reflect-metadata";

//Rutas
import crearCategoriaRuta from "./rutas/crear-categoria.ruta";
import obtenercategoriasRuta from "./rutas/obtener-categoria.ruta";

dotenv.config();

const app = express();
const PUERTO = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(
  "/api/documentacion",
  swaggerUi.serve,
  swaggerUi.setup(documentacionSwagger),
);

// Ruta de testeo
app.get("/api/estado-bd", async (_req, res) => {
  try {
    await conexion.raw("SELECT 1");

    res.json({
      estado: "Correcto",
      mensaje: "Conexión con MySQL establecida correctamente",
    });
  } catch (error) {
    console.error("Error de conexión:", error);

    res.status(500).json({
      estado: "Error",
      mensaje: "No se pudo conectar con MySQL",
    });
  }
});

//---------------------------------------------------------------
//Categorias
//---------------------------------------------------------------
app.use("/api/categorias", crearCategoriaRuta);
app.use("/api/categorias", obtenercategoriasRuta);


// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PUERTO}/api/estado-bd`);
});
