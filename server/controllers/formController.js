const Boom = require('@hapi/boom');
const db = require('../models/index');
const DBError = require('../helpers/CustomOpErrors/DBError');

const { Form: FormModel } = db.sequelize.models;

const getAllFormsHandler = async (request, h) => {
  let forms = await FormModel.findAll().catch((err) => {
    throw new DBError(err, 'Sorry, cannot get forms! Error occured!');
  });
  forms = forms.map((form) => form.dataValues);
  return forms;
};

const getFormByIdHandler = async (request, h) => {
  let form = await FormModel.findByPk(request.params.id).catch((err) => {
    throw new DBError(err, 'Sorry, cannot get required form! Error occured!');
  });

  if (!form) {
    return Boom.notFound("Form with such id wasn't found!");
  }
  form = form.dataValues;
  return form;
};

const addNewFormHandler = async (request, h) => {
  const { name, data, userId } = request.payload;

  const formWithSuchName = await FormModel.findOne({
    where: {
      name,
      userId,
    },
  }).catch((err) => {
    throw new DBError(err, 'Sorry, server is down!');
  });
  if (formWithSuchName) {
    return 'Form with such name alredy exists, please choose another name for your form!';
  }

  await FormModel.create({ name, data, userId }).catch((err) => {
    throw new DBError(
      err,
      'Sorry, cannot save the new form! Error occured!',
      500
    );
  });

  return 'Form successfully added!';
};

const updateFormHandler = async (request, h) => {
  const { name, data, userId } = request.payload;

  const isUpdated = await FormModel.update(
    { name, data, userId },
    {
      where: {
        id: request.params.id,
      },
    }
  ).catch((err) => {
    throw new DBError(err, 'Sorry, cannot update the form! Error occured!');
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
    throw new DBError(err, 'Sorry, cannot delete the form! Error occured!');
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
