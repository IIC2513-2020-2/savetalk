
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    happensAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    platform: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    registration: {
      type: DataTypes.STRING,
    },
    organizationId: {
      type: DataTypes.INTEGER,
    },
  }, {});
  event.associate = function associate(models) {
    // associations can be defined here
    event.belongsTo(models.organization);
    event.belongsToMany(models.user, {
      as: 'attendees',
      through: 'attendances',
      foreignKey: 'eventId',
    });
  };
  return event;
};
