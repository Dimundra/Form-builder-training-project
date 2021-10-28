module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    'Form',
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Form.associate = ({ User }) => {
    Form.belongsTo(User);
  };

  return Form;
};
