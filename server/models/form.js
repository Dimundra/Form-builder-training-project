const { DataTypes, Model } = require('sequelize');

class form extends Model {}

module.exports = (sequelize) => {
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
};
