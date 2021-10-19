const db = require('../models/index');

const { User: UserModel } = db.sequelize.models;

const validateToken = async function (decoded, request, h) {
  let user = await UserModel.findByPk(decoded.id);

  return { isValid: Boolean(user) };
};

module.exports = validateToken;
