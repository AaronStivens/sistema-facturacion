
import swaggerJsdoc from "swagger-jsdoc";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

// Importar los DTO para registrar sus decoradores
import "../DTO/crear-categoria.dto";

// Generar esquemas automáticamente
const esquemasDTO = validationMetadatasToSchemas({
    refPointerPrefix: "#/components/schemas/"
});

const opciones: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API - Sistema de Facturación",
            version: "1.0.0",
            description: "Documentación de la API REST del sistema de facturación."
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ],
        components: {
            schemas: esquemasDTO
        }
    },
    apis: [
        "./src/rutas/**/*.ts",
        "./src/servidor.ts"
    ]
};

const documentacionSwagger = swaggerJsdoc(opciones);

export default documentacionSwagger;
