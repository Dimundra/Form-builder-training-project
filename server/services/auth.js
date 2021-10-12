const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models/index');
const secret = require('../const.js');

async function authenticatelogin(email, password) {
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

async function authenticateRegistration(nickname, email, password) {
  const { user } = db.sequelize.models;

  let userWithSuchNickname = await user.findOne({
    where: {
      nickname: nickname,
    },
  });
  if (userWithSuchNickname) {
    return 'User with such nickname already exists! Please choose another nickname.';
  }

  let userWithSuchEmail = await user.findOne({
    where: {
      email: email,
    },
  });
  if (userWithSuchEmail) {
    return 'User with such email already exists!';
  }

  let userWithSuchPassword = await user.findOne({
    where: {
      password: password,
    },
  });
  if (userWithSuchPassword) {
    return 'Use another password please!';
  }

  const { id: newUserId } = await user.create({ nickname, email, password });

  const payloadForJWT = { id: newUserId };
  const expirationTimeOfJWT = '30000ms'; // 30 sec
  const token = JWT.sign(payloadForJWT, secret, {
    expiresIn: expirationTimeOfJWT,
  });
  return { token: token };
}

module.exports = { authenticatelogin, authenticateRegistration };
