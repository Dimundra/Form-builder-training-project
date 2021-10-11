const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class form extends Model {}

  form.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  form.associate = ({ user }) => {
    form.belongsTo(user);
  };

  return form;
};
