const db = require('../models/index');

const { user: userModel } = db.sequelize.models;

const validateToken = async function (decoded, request, h) {
  let user = await userModel.findByPk(decoded.id);

  return { isValid: Boolean(user) };
};

module.exports = validateToken;
