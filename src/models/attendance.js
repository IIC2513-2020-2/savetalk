
module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define('attendance', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
  }, {});
  attendance.associate = function associate() {
    // associations can be defined here
  };
  return attendance;
};
