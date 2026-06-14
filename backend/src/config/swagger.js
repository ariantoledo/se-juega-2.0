const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Se Juega API',
      version: '1.0.0',
      description: 'Documentación de la API Se Juega',
    },
    servers: [
      {
        url: 'http://localhost:3002/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // rutas donde pondremos comentarios Swagger
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
