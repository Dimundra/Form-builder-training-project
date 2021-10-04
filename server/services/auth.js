const Joi = require('joi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const users = require('../models/db.js');
const secret = require('../const.js');

const schema = Joi.object({
  email: Joi.string().required('required!').email(),
  password: Joi.string().required('required').min(6).max(20),
});

function authenticateUser(email, password) {
  const { value, error } = schema.validate({ email, password });

  if (error) {
    return Boom.unauthorized('email or password is wrong!');
  } else {
    const { email, password } = value;

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
}

module.exports = authenticateUser;
