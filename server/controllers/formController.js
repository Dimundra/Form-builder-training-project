const db = require('../models/index');
const Boom = require('@hapi/boom');

// use form model
const { form: formModel } = db.sequelize.models;
///

const getAllFormsHandler = async (request, h) => {
  let forms = await formModel.findAll();

  if (forms.length === 0) {
    return Boom.notFound('No forms found!');
  } else {
    forms = forms.map((form) => form.dataValues);
    return forms;
  }
};

const getFormByIdHandler = async (request, h) => {
  let form = await formModel.findOne({
    where: {
      id: request.params.id,
    },
  });

  if (!form) {
    return Boom.notFound("User with such id wasn't found!");
  } else {
    form = form.dataValues;
    return form;
  }
};

const addNewFormHandler = async (request, h) => {
  const { name, data, userId } = request.payload;

  const formWithSuchName = await formModel.findOne({
    where: {
      name: name,
    },
  });
  if (formWithSuchName) {
    return 'Form with such name alredy exists, please choose another name for your form!';
  }

  await formModel.create({ name, data, userId });

  return 'Form successfully added!';
};

const updateFormHandler = async (request, h) => {
  const { name, data } = request.payload;

  const form = await formModel.findOne({
    where: {
      id: request.params.id,
    },
  });

  if (!form) {
    return Boom.notFound("Form with such id wasn't found!");
  } else {
    if (!name && !data) {
      return "Sorry but you haven't provided an appropriate data to update the form!";
    }

    if (name) {
      await formModel.update(
        { name },
        {
          where: {
            id: request.params.id,
          },
        }
      );
    }
    if (data) {
      await formModel.update(
        { data },
        {
          where: {
            id: request.params.id,
          },
        }
      );
    }
    return 'Form successfully updated!';
  }
};

const deleteFormHandler = async (request, h) => {
  const form = await formModel.findOne({
    where: {
      id: request.params.id,
    },
  });

  if (!form) {
    return Boom.notFound("Form with such id wasn't found!");
  } else {
    await formModel.destroy({
      where: {
        id: request.params.id,
      },
    });
    return 'Form succesfully deleted!';
  }
};

module.exports = {
  deleteFormHandler,
  getAllFormsHandler,
  getFormByIdHandler,
  addNewFormHandler,
  updateFormHandler,
};
