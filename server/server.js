const Hapi = require('@hapi/hapi');

const PORT = 3002;

const server = Hapi.server({
  port: PORT,
  host: '0.0.0.0',
});

(async function () {
  await server.register(require('@hapi/inert'));

  await server.start();
  console.log(`server has started on port ${PORT}...`);
})();

server.route({
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: '../client/build/',
    },
  },
});

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = server;
