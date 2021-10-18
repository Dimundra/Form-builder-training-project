const Boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models/index');
const buildToken = require('./buildToken');

const { User: UserModel } = db.sequelize.models;

async function authenticateLogin(email, password) {
  let user = await UserModel.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (!user) {
    return Boom.unauthorized('email or password is wrong!');
  }
  return buildToken(user.dataValues.id);
}

async function authenticateRegistration(nickname, email, password) {
  const suchUserExists = await UserModel.findOne({
    where: {
      [Op.or]: [{ nickname }, { email }],
    },
  });
  if (suchUserExists) {
    return 'Such nickname or email already taken!';
  }

  const { id: newUserId } = await UserModel.create({
    nickname,
    email,
    password,
  });

  return buildToken(newUserId);
}

module.exports = { authenticateLogin, authenticateRegistration };
