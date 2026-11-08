
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PUERTO = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/estado", (_req, res) => {
    res.json({
        estado: "Correcto",
        mensaje: "API del sistema de facturación funcionando"
    });
});

// Iniciar servidor
app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});
