const {
  authenticatelogin,
  authenticateRegistration,
} = require('../services/auth.js');
const db = require('../models/index');
const Boom = require('@hapi/boom');

const cabinetPageHandler = (request, h) => {
  return 'Here should be the list of the constructed forms!';
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  return await authenticatelogin(email, password);
};

const registrationHandler = async (request, h) => {
  const { nickname, email, password } = request.payload;

  return authenticateRegistration(nickname, email, password);
};

const getAllUsersHanlder = async (request, h) => {
  let users = await db.sequelize.models.user.findAll();

  if (users.length === 0) {
    return Boom.notFound('No users found!');
  } else {
    users = users.map((user) => user.dataValues);
    return users;
  }
};

const getUserByIdHandler = async (request, h) => {
  let user = await db.sequelize.models.user.findOne({
    where: {
      id: request.params.id,
    },
  });

  if (!user) {
    return Boom.notFound("User with such id wasn't found!");
  } else {
    user = user.dataValues;
    return user;
  }
};

const updateUserPasswordHandler = async (request, h) => {
  const userModel = db.sequelize.models.user;
  const { password } = request.payload;
  const user = await userModel.findOne({
    where: {
      id: request.params.id,
    },
  });

  if (!user) {
    return Boom.notFound("User with such id wasn't found!");
  } else {
    await userModel.update(
      { password: password },
      {
        where: {
          id: request.params.id,
        },
      }
    );
    return 'User password succesfully updated!';
  }
};

const deleteUserHandler = async (request, h) => {
  const userModel = db.sequelize.models.user;
  const user = await userModel.findOne({
    where: {
      id: request.params.id,
    },
  });

  if (!user) {
    return Boom.notFound("User with such id wasn't found!");
  } else {
    await userModel.destroy({
      where: {
        id: request.params.id,
      },
    });
    return 'User succesfully deleted!';
  }
};

module.exports = {
  deleteUserHandler,
  registrationHandler,
  loginHandler,
  cabinetPageHandler,
  getAllUsersHanlder,
  getUserByIdHandler,
  updateUserPasswordHandler,
};
