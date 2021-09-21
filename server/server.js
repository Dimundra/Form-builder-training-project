const Hapi = require('@hapi/hapi');
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
        // extracting encoded form data from Authorization header
        console.log(
          'request.headers.authorization',
          request.headers.authorization
        );
        const encodedCredentials = request.headers.authorization.split(' ')[1];
        console.log('encodedCredentials', encodedCredentials);
        // decoding form data to an array of the form [ email, password ]
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64')
          .toString('utf-8')
          .split(':');

        console.log('decodedCredentials', decodedCredentials);

        let isUserValid = false;
        for (const user of users) {
          if (
            decodedCredentials[0] === user.email &&
            decodedCredentials[1] === user.password
          ) {
            isUserValid = true;
          }
        }

        if (isUserValid) {
          const userCredentials = users.find(
            (user) => decodedCredentials[0] === user.email
          );
          const payload = { id: userCredentials.id };
          const token = JWT.sign(payload, secret, { expiresIn: '30000ms' });
          return { token: token };
        } else {
          return {
            error: 'Sorry, but username or password is wrong! Try again!',
          };
        }
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
