const Joi = require('joi');
const {
  getAllFormsHandler,
  getFormByIdHandler,
  addNewFormHandler,
  updateFormHandler,
  deleteFormHandler,
} = require('../controllers/formController');

const getAllForms = {
  method: 'GET',
  path: '/forms',
  handler: async (request, h) => getAllFormsHandler(request, h),
};

const getFormById = {
  method: 'GET',
  path: '/form/{id}',
  handler: async (request, h) => getFormByIdHandler(request, h),
};

const addNewForm = {
  method: 'POST',
  path: '/form',
  handler: async (request, h) => addNewFormHandler(request, h),
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required('required!'),
        data: Joi.object().required('required!'),
        userId: Joi.string().required('required!'),
      }),
    },
  },
};

const updateForm = {
  method: 'PUT',
  path: '/form/{id}',
  handler: async (request, h) => updateFormHandler(request, h),
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required('required!'),
        data: Joi.object().required('required!'),
        userId: Joi.string().required('required!'),
      }),
    },
  },
};

const deleteForm = {
  method: 'DELETE',
  path: '/form/{id}',
  handler: async (request, h) => deleteFormHandler(request, h),
};

module.exports = [getAllForms, getFormById, addNewForm, updateForm, deleteForm];
