const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

const usuarios = require('./comandos/usuarios.js');
const notas = require('./comandos/notas.js');
const create = require('./comandos/create.js');


fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

create();
usuarios(fastify);
notas(fastify);

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
