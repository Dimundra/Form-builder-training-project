const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: 3002,
    host: '0.0.0.0',
  });

  await server.register(require('@hapi/inert'));

  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: '../client/build/',
      },
    },
  });

  await server.start();
  console.log('server has started on port 3002...');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
