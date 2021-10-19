const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const db = require('../models/index');
const secret = require('../const.js');

async function authenticateUser(email, password) {
  let user = await db.sequelize.models.user.findOne({
    where: {
      email: email,
      password: password,
    },
  });

  if (!user) {
    return Boom.unauthorized('email or password is wrong!');
  } else {
    const userCredentials = user.dataValues;
    const payloadForJWT = { id: userCredentials.id };
    const expirationTimeOfJWT = '30000ms'; // 30 sec
    const token = JWT.sign(payloadForJWT, secret, {
      expiresIn: expirationTimeOfJWT,
    });
    return { token: token };
  }
}

module.exports = authenticateUser;
