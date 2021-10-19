const Boom = require('@hapi/boom');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const buildToken = require('./buildToken');

const { User: UserModel } = db.sequelize.models;

async function authenticateLogin(email, password) {
  let userWithSuchEmail = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (!userWithSuchEmail) {
    return Boom.unauthorized('Email or password is wrong!');
  }

  userWithSuchEmail = userWithSuchEmail.dataValues;
  const isPasswordMatch = await bcrypt.compare(
    password,
    userWithSuchEmail.password
  );

  if (!isPasswordMatch) {
    return Boom.unauthorized('Email or password is wrong!');
  }

  return buildToken(userWithSuchEmail.id);
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

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const { id: newUserId } = await UserModel.create({
    nickname: nickname,
    email: email,
    password: hashedPassword,
  });

  return buildToken(newUserId);
}

module.exports = { authenticateLogin, authenticateRegistration };
