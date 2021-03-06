const Boom = require('@hapi/boom');
const db = require('../models/index');
const DBError = require('../helpers/CustomOpErrors/DBError');

const { Form: FormModel } = db.models;

const addNewFormHandler = async (request, h) => {
  const { name, data, user_id } = request.payload;

  const formWithSuchName = await FormModel.findOne({
    where: {
      name,
      user_id,
    },
  }).catch((err) => {
    throw new DBError('Sorry, server is down!', err.stack);
  });
  if (formWithSuchName) {
    return 'Form with such name alredy exists, please choose another name for your form!';
  }

  await FormModel.create({ name, data, user_id }).catch((err) => {
    throw new DBError(
      'Sorry, cannot save the new form! Error occured!',
      err.stack
    );
  });

  return 'Form successfully added!';
};

const getAllFormsHandler = async (request, h) => {
  let forms = await FormModel.findAll().catch((err) => {
    throw new DBError('Sorry, cannot get forms! Error occured!', err.stack);
  });
  forms = forms.map((form) => form.dataValues);
  return forms;
};

const getFormByIdHandler = async (request, h) => {
  let form = await FormModel.findByPk(request.params.id).catch((err) => {
    throw new DBError(
      'Sorry, cannot get required form! Error occured!',
      err.stack
    );
  });

  if (!form) {
    return Boom.notFound("Form with such id wasn't found!");
  }
  form = form.dataValues;
  return form;
};

const updateFormHandler = async (request, h) => {
  const { name, data, user_id } = request.payload;

  const [isUpdated] = await FormModel.update(
    { name, data, user_id },
    {
      where: {
        id: request.params.id,
      },
    }
  ).catch((err) => {
    throw new DBError(
      'Sorry, cannot update the form! Error occured!',
      err.stack
    );
  });
  if (!isUpdated) {
    return Boom.notFound("Form with such id wasn't found!");
  }
  return 'Form successfully updated!';
};

const deleteFormHandler = async (request, h) => {
  const isDestroyed = await FormModel.destroy({
    where: {
      id: request.params.id,
    },
  }).catch((err) => {
    throw new DBError(
      'Sorry, cannot delete the form! Error occured!',
      err.stack
    );
  });
  if (!isDestroyed) {
    return Boom.notFound("Form with such id wasn't found!");
  }
  return 'Form succesfully deleted!';
};

module.exports = {
  deleteFormHandler,
  getAllFormsHandler,
  getFormByIdHandler,
  addNewFormHandler,
  updateFormHandler,
};
