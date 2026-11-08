import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import documentacionSwagger from "./configuracion/swagger";
import conexion from "../base-datos/conexion";

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

// Ruta de prueba
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

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PUERTO}/api/estado-bd`);
});
