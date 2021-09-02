const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: 3002,
  host: '0.0.0.0',
});

(async function () {
  await server.register(require('@hapi/inert'));

  await server.start();
  console.log('server has started on port 3002...');
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
  console.log(err);
  process.exit(1);
});

module.exports = server;
