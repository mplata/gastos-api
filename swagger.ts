const swaggerDefinition = {
  openapi: '3.0.0', // Versión de OpenAPI
  info: {
    title: 'API Gastos', // Título de tu API
    version: '1.0.0', // Versión de la API
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL de tu servidor
    },
  ],
};

const options = {
  swaggerDefinition,
  // Rutas a tus archivos de TypeScript donde se definen los endpoints
  apis: ['./index.ts'],
};

export default options;