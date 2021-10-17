const {
  authenticateLogin,
  authenticateRegistration,
} = require('../services/auth.js');
const db = require('../models/index');
const Boom = require('@hapi/boom');

const { User: FormModel } = db.sequelize.models;

const cabinetPageHandler = (request, h) => {
  return 'Here should be the list of the constructed forms!';
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  return authenticateLogin(email, password);
};

const registrationHandler = async (request, h) => {
  const { nickname, email, password } = request.payload;

  return authenticateRegistration(nickname, email, password);
};

const getAllUsersHanlder = async (request, h) => {
  let users = await FormModel.findAll();
  users = users.map((user) => user.dataValues);
  return users;
};

const getUserByIdHandler = async (request, h) => {
  let user = await FormModel.findByPk(request.params.id);

  if (!user) {
    return Boom.notFound("User with such id wasn't found!");
  }
  user = user.dataValues;
  return user;
};

const updateUserPasswordHandler = async (request, h) => {
  const { password } = request.payload;

  try {
    await FormModel.update(
      { password: password },
      {
        where: {
          id: request.params.id,
        },
      }
    );
    return 'User password succesfully updated!';
  } catch (err) {
    console.log(err);
    return Boom.notFound("User with such id wasn't found!");
  }
};

const deleteUserHandler = async (request, h) => {
  try {
    await FormModel.destroy({
      where: {
        id: request.params.id,
      },
    });
    return 'User succesfully deleted!';
  } catch (err) {
    console.log(err);
    return Boom.notFound("User with such id wasn't found!");
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
