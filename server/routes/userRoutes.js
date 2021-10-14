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

const loginRoute = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => await loginHandler(request, h),
  options: {
    cors: true,
    validate: {
      payload: Joi.object({
        email: Joi.string().required('required!').email(),
        password: Joi.string()
          .required('required')
          .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/))
          .min(6)
          .max(20),
      }),
    },
  },
};

const registration = {
  method: 'POST',
  path: '/registration',
  handler: async (request, h) => await registrationHandler(request, h),
  options: {
    validate: {
      payload: Joi.object({
        nickname: Joi.string().required('required!'),
        email: Joi.string().required('required!').email(),
        password: Joi.string()
          .required('required')
          .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/))
          .min(6)
          .max(20),
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
  handler: async (request, h) => await getAllUsersHanlder(request, h),
};

const getUserById = {
  method: 'GET',
  path: '/user/{id}',
  handler: async (request, h) => await getUserByIdHandler(request, h),
};

const updateUserPassword = {
  method: 'PUT',
  path: '/user/{id}',
  handler: async (request, h) => await updateUserPasswordHandler(request, h),
  options: {
    validate: {
      payload: Joi.object({
        password: Joi.string()
          .required('required!')
          .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)),
      }),
    },
  },
};

const deleteUser = {
  method: 'DELETE',
  path: '/user/{id}',
  handler: async (request, h) => await deleteUserHandler(request, h),
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
