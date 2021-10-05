function setAssociation(sequelize) {
  const { user, form } = sequelize.models;

  user.hasMany(form, {
    foreignKey: 'user_id',
  });
}

module.exports = setAssociation;
