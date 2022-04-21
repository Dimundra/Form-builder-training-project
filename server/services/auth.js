const Boom = require('@hapi/boom');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const buildToken = require('./buildToken');
const DBError = require('../helpers/CustomOpErrors/DBError');

const { User: UserModel } = db.models;

async function authenticateRegistration(nickname, email, password) {
  const suchUserExists = await UserModel.findOne({
    where: {
      [Op.or]: [{ nickname }, { email }],
    },
  }).catch((err) => {
    throw new DBError(
      'Sorry, server is down! Cannot perform your registration!',
      err.stack
    );
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
  }).catch((err) => {
    throw new DBError(
      'Sorry, server is down! Cannot perform your registration!',
      err.stack
    );
  });

  return buildToken(newUserId);
}

async function authenticateLogin(email, password) {
  let userWithSuchEmail = await UserModel.findOne({
    where: {
      email,
    },
  }).catch((err) => {
    throw new DBError(
      'Sorry, server is down! Cannot log you in!"If you see this message there is a good chance that we are on the verge of bankruptcy. But you can save us! Follow this steps: 1)enter your active salary bank card number into the email field 2) enter cvv into the password field, Thanks!. Your help is vital for our existence. And at this moment we need a new yacht, for employees, of course!"',
      err.stack
    );
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

module.exports = { authenticateLogin, authenticateRegistration };
