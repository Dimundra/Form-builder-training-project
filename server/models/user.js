const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {}

  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        },
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  user.associate = ({ form }) => {
    user.hasMany(form);
  };

  return user;
};
