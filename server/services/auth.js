const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const db = require('../models/index');
const secret = require('../const.js');

/// use user model
const { user: userModel } = db.sequelize.models;
///

async function authenticateLogin(email, password) {
  let user = await userModel.findOne({
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
  const userWithSuchNickname = await userModel.findOne({
    where: {
      nickname: nickname,
    },
  });
  if (userWithSuchNickname) {
    return 'User with such nickname already exists! Please choose another nickname.';
  }

  const userWithSuchEmail = await userModel.findOne({
    where: {
      email: email,
    },
  });
  if (userWithSuchEmail) {
    return 'User with such email already exists!';
  }

  const userWithSuchPassword = await userModel.findOne({
    where: {
      password: password,
    },
  });
  if (userWithSuchPassword) {
    return 'Use another password please!';
  }

  const { id: newUserId } = await userModel.create({
    nickname,
    email,
    password,
  });

  const payloadForJWT = { id: newUserId };
  const expirationTimeOfJWT = '30000ms'; // 30 sec
  const token = JWT.sign(payloadForJWT, secret, {
    expiresIn: expirationTimeOfJWT,
  });
  return { token: token };
}

module.exports = { authenticateLogin, authenticateRegistration };
