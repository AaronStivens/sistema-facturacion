# Sistema de facturación

## Descripción

Sistema web de facturación y gestión de ventas desarrollado para apoyar la administración de un emprendimiento dedicado a la comercialización de artículos tecnológicos.

El objetivo del proyecto es construir una aplicación que permita centralizar la información comercial, facilitar el registro de operaciones de venta y proporcionar información útil para el seguimiento de los ingresos y el desempeño del negocio.

Actualmente, el proyecto se encuentra en su etapa inicial de desarrollo, con el frontend y el backend configurados.

## Objetivos

- Desarrollar un sistema de facturación web.
- Facilitar la administración de clientes y productos.
- Permitir el registro y control de las ventas.
- Generar reportes que faciliten el análisis de las operaciones comerciales.
- Mantener una arquitectura organizada, escalable y fácil de mantener.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript

### Base de datos
- MySQL
- Knex.js

### Herramientas
- Git y GitHub
- Visual Studio Code
- ThunderCliente / Postman / Swagger

## Arquitectura del proyecto

El sistema utiliza una arquitectura cliente-servidor. El frontend se comunica con el backend mediante una API REST, mientras que el backend se encarga de procesar las solicitudes y gestionar el acceso a la base de datos.


## Instalación y ejecución

### Requisitos previos

- Node.js y npm.
- MySQL.
- Git.

### Clonar el repositorio

```bash
git clone https://github.com/AaronStivens/sistema-facturacion.git
cd sistema-facturacion
```

### Configurar el frontend

```bash
cd frontend
npm install
npm run dev
```

### Configurar el backend

En otra terminal:

```bash
cd backend
npm install
npm run dev
```

El backend se ejecuta localmente en el puerto 3000 y dispone de una ruta inicial de comprobación:

```text
http://localhost:3000/api/estado
```

## Pruebas y calidad

El proyecto incorporará pruebas automatizadas para verificar el funcionamiento de sus componentes y servicios. También se configurará integración continua mediante GitHub Actions para ejecutar verificaciones automáticamente ante cambios en el repositorio.

## Seguridad

Los archivos que contienen credenciales y variables de entorno no deben subirse al repositorio. Se utilizará `.gitignore` para excluir archivos sensibles y se proporcionarán ejemplos de configuración sin credenciales reales cuando sean necesarios.

## Estado del proyecto

**En desarrollo.** La estructura inicial del frontend y backend se encuentra creada. Las funcionalidades de gestión de clientes, productos, facturación y reportes se incorporarán progresivamente.

## Autor

Proyecto desarrollado por Aaron Hernandez.

## Código de verificación

`LEARN-CAP-B22BA160`