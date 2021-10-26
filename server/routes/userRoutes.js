const Joi = require('joi');
const {
  loginHandler,
  cabinetPageHandler,
  getAllUsersHanlder,
  getUserByIdHandler,
  registrationHandler,
  updateUserPasswordHandler,
  deleteUserHandler,
} = require('../controllers/userController');

const registration = {
  method: 'POST',
  path: '/registration',
  handler: async (request, h) => registrationHandler(request, h),
  options: {
    validate: {
      payload: Joi.object({
        nickname: Joi.string().required('required!'),
        email: Joi.string().required('required!').email(),
        password: Joi.string()
          .required('required')
          .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)),
      }),
    },
  },
};

const loginRoute = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => loginHandler(request, h),
  options: {
    cors: true,
    validate: {
      payload: Joi.object({
        email: Joi.string().required('required!').email(),
        password: Joi.string()
          .required('required')
          .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)),
      }),
    },
  },
};

const cabinetRoute = {
  method: 'GET',
  path: '/cabinet',
  handler: (request, h) => cabinetPageHandler(request, h),
  options: {
    auth: 'jwt',
  },
};

const getAllUsers = {
  method: 'GET',
  path: '/users',
  handler: async (request, h) => getAllUsersHanlder(request, h),
};

const getUserById = {
  method: 'GET',
  path: '/user/{id}',
  handler: async (request, h) => getUserByIdHandler(request, h),
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().required('id param required!'),
      }),
    },
  },
};

const updateUserPassword = {
  method: 'PUT',
  path: '/user/{id}',
  handler: async (request, h) => updateUserPasswordHandler(request, h),
  options: {
    validate: {
      payload: Joi.object({
        password: Joi.string()
          .required('required!')
          .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)),
      }),
      params: Joi.object({
        id: Joi.string().required('id param required!'),
      }),
    },
  },
};

const deleteUser = {
  method: 'DELETE',
  path: '/user/{id}',
  handler: async (request, h) => deleteUserHandler(request, h),
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().required('id param required!'),
      }),
    },
  },
};

module.exports = [
  deleteUser,
  updateUserPassword,
  loginRoute,
  cabinetRoute,
  getAllUsers,
  getUserById,
  registration,
];
