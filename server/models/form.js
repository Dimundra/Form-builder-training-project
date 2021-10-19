const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Form extends Model {}

  Form.init(
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
        unique: true,
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

  Form.associate = ({ User }) => {
    Form.belongsTo(User);
  };

  return Form;
};
