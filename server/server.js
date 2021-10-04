const Hapi = require('@hapi/hapi');
const validate = require('./services/tokenValidation.js');
const routes = require('./routes/routes.js');
const secret = require('./const.js');

const PORT = 3002;

const server = Hapi.server({
  port: PORT,
  host: '0.0.0.0',
});

(async function () {
  await server.register([
    {
      plugin: require('@hapi/inert'),
    },
    {
      plugin: require('hapi-auth-jwt2'),
    },
  ]);

  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    validate,
  });

  server.route(routes);

  await server.start();
  console.log(`server has started on port ${PORT}...`);
})();

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = server;
