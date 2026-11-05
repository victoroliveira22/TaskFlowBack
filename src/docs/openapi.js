const comum = require('./comum');
const tarefas = require('./tarefas.docs');

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'TaskFlow API',
    version: '1.0.0',
    description: 'API do TaskFlow',
  },
  servers: [
    { url: '/', description: 'Este servidor' },
  ],
  security: [{ bearerAuth: [] }],
  paths: {
    ...tarefas.paths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...comum.schemas,
      ...tarefas.schemas,
    },
  },
};