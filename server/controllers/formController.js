const db = require('../models/index');
const Boom = require('@hapi/boom');

const { form: formModel } = db.sequelize.models;

const getAllFormsHandler = async (request, h) => {
  let forms = await formModel.findAll();
  forms = forms.map((form) => form.dataValues);
  return forms;
};

const getFormByIdHandler = async (request, h) => {
  let form = await formModel.findByPk(request.params.id);

  if (!form) {
    return Boom.notFound("User with such id wasn't found!");
  }
  form = form.dataValues;
  return form;
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
  const { name, data, userId } = request.payload;

  try {
    await formModel.update(
      { name, data, userId },
      {
        where: {
          id: request.params.id,
        },
      }
    );
    return 'Form successfully updated!';
  } catch (err) {
    console.log(err);
    return Boom.notFound("Form with such id wasn't found!");
  }
};

const deleteFormHandler = async (request, h) => {
  try {
    await formModel.destroy({
      where: {
        id: request.params.id,
      },
    });
    return 'Form succesfully deleted!';
  } catch (err) {
    console.log(err);
    return Boom.notFound("Form with such id wasn't found!");
  }
};

module.exports = {
  deleteFormHandler,
  getAllFormsHandler,
  getFormByIdHandler,
  addNewFormHandler,
  updateFormHandler,
};
