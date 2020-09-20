module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    logo: DataTypes.STRING,
  }, {});

  organization.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return organization;
};
