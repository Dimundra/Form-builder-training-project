const Boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const {
  authenticateLogin,
  authenticateRegistration,
} = require('../services/auth.js');
const db = require('../models/index');
const DBError = require('../helpers/CustomOpErrors/DBError');

const { User: UserModel } = db.models;

const cabinetPageHandler = (request, h) => {
  return 'Here should be the list of the constructed forms!';
};

const registrationHandler = async (request, h) => {
  const { nickname, email, password } = request.payload;

  return authenticateRegistration(nickname, email, password);
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  return authenticateLogin(email, password);
};

const getAllUsersHandler = async (request, h) => {
  let users = await UserModel.findAll().catch((err) => {
    throw new DBError('Sorry, cannot get you users! Error occured!', err.stack);
  });
  users = users.map((user) => user.dataValues);
  return users;
};

const getUserByIdHandler = async (request, h) => {
  let user = await UserModel.findByPk(request.params.id).catch((err) => {
    throw new DBError('Sorry, cannot get your user! Error occured!', err.stack);
  });

  if (!user) {
    return Boom.notFound("User with such id wasn't found!");
  }
  user = user.dataValues;
  return user;
};

const updateUserPasswordHandler = async (request, h) => {
  const { password } = request.payload;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const [isUpdated] = await UserModel.update(
    { password: hashedPassword },
    {
      where: {
        id: request.params.id,
      },
    }
  ).catch((err) => {
    throw new DBError(
      'Sorry, cannot update your password! Error occured!',
      err.stack
    );
  });
  if (!isUpdated) {
    return Boom.notFound("User with such id wasn't found!");
  }
  return 'User password succesfully updated!';
};

const deleteUserHandler = async (request, h) => {
  const isDestroyed = await UserModel.destroy({
    where: {
      id: request.params.id,
    },
  }).catch((err) => {
    throw new DBError(
      'Sorry, cannot delete your account! Local authoritarian government not approving such action!',
      err.stack
    );
  });
  if (!isDestroyed) {
    return Boom.notFound("User with such id wasn't found!");
  }
  return 'User succesfully deleted!';
};

module.exports = {
  deleteUserHandler,
  registrationHandler,
  loginHandler,
  cabinetPageHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserPasswordHandler,
};
