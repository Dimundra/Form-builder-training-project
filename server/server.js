const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');

const PORT = 3002;

const server = Hapi.server({
  port: PORT,
  host: '0.0.0.0',
});

const users = [
  {
    id: 0,
    nick_name: 'Dima',
    email: 'dima@gmail.com',
    password: 'helloDima',
  },
  {
    id: 1,
    nick_name: 'V',
    email: 'V@gmail.com',
    password: 'helloV',
  },
];

const secret = 'owieuricmudfh';

const validate = async function (decoded, request, h) {
  let isValid = false;
  for (const user of users) {
    if (user.id === decoded.id) {
      isValid = true;
    }
  }

  return { isValid: isValid };
};

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

  server.route([
    {
      method: 'POST',
      path: '/login',
      handler: (request, h) => {
        const email = request.payload.email;
        const password = request.payload.password;

        if (email === '' || password === '') {
          return Boom.unauthorized(
            'Sorry, but username or password is wrong! Try again!'
          );
        }

        for (const user of users) {
          if (email === user.email && password === user.password) {
            const userCredentials = user;
            const payloadForJWT = { id: userCredentials.id };
            const expirationTimeOfJWT = '30000ms'; // 30 sec
            const token = JWT.sign(payloadForJWT, secret, {
              expiresIn: expirationTimeOfJWT,
            });
            return { token: token };
          }
        }

        return Boom.unauthorized(
          'Sorry, but username or password is wrong! Try again!'
        );
      },
    },
  ]);

  await server.start();
  console.log(`server has started on port ${PORT}...`);
})();

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = server;
