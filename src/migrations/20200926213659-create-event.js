
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    happensAt: {
      type: Sequelize.DATE,
    },
    platform: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    registration: {
      type: Sequelize.STRING,
    },
    organizationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'organizations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('events'),
};
