const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const users = require('../models/db.js');
const secret = require('../const.js');

function authenticateUser(email, password) {
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

  return Boom.unauthorized('email or password is wrong!');
}

module.exports = authenticateUser;
