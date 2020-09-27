module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
  }, {});

  organization.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return organization;
};
