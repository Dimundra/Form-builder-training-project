const db = require('../models/index');

const hanldleDB = async (request, h) => {
  const { user } = db.sequelize.models;
  let users = await user.findAll();
  users = JSON.stringify(users);
  return users;
};

module.exports = hanldleDB;
