const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    hooks: {
      beforeSave: async (instance) => {
        if (instance.changed('password')) {
          /* eslint-disable-next-line no-param-reassign */
          instance.password = await bcrypt.hash(instance.password, 10);
        }
      },
    },
  });
  user.associate = function associate(models) {
    // associations can be defined here
    user.belongsToMany(models.event, {
      through: 'attendances',
      foreignKey: 'userId',
    });
  };
  return user;
};
