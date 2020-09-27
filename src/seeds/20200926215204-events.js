'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const ORGANIZATION_NAME = 'DCC';
    const EVENTS_QUANTITY = 2;

    const orgs = await queryInterface.sequelize.query(
      `SELECT id FROM organizations WHERE name='${ORGANIZATION_NAME}'`
    );
    const { id: organizationId } = orgs[0][0];
    const eventsData = [];    
    for (let i = 0; i < EVENTS_QUANTITY; i += 1) {
      eventsData.push({
        organizationId,
        title: `Evento ${i + 1}`,
        happensAt: new Date(`2020-10-0${i + 1}`),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('events', eventsData);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
