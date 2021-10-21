const Hapi = require('@hapi/hapi');
const validate = require('./services/tokenValidation.js');
const routes = require('./routes/routes.js');
const secret = require('./const.js');
const DBError = require('./helpers/CustomOpErrors/DBError');

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

  server.ext('onPreResponse', preResponse);

  await server.start();
  console.log(`server has started on port ${PORT}...`);
})();

function preResponse(request, h) {
  const response = request.response;

  if (!(response.isBoom && response instanceof DBError)) {
    return h.continue;
  }

  const responsePayload = {
    statusCode: 500,
    error: 'Internal Server Error',
    message: response.messageForClient,
  };

  return h.response(responsePayload).code(response.statusCode);
}

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = server;
