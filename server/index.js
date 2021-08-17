const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: '0.0.0.0',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello Friend!';
    },
  });

  await server.start();
  console.log('server has started on port 3001...');
};

process.on('unhandledRejection', (err) => {
  process.exit(1);
});

init();
