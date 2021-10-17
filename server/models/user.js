const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
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

  User.associate = ({ Form }) => {
    User.hasMany(Form);
  };

  return User;
};
