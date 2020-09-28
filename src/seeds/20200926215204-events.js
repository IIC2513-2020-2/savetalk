// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

function getRandomPlatform() {
  const randomNumber = Math.random();
  let platform;
  if (randomNumber < 0.33) {
    platform = 'Zoom';
  } else if (randomNumber < 0.66) {
    platform = 'Youtube';
  } else {
    platform = 'Facebook Live';
  }
  return platform;
}

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
    const orgs = await queryInterface.sequelize.query(
      `SELECT id FROM organizations`
    );
    const orgIds = orgs[0].map(({ id }) => id);
    const eventsBulkInsertPromises = orgIds.map((organizationId) => {
      const quantity = faker.random.number({ min: 1, max: 10 });
      const eventsData = [];
      for (let i = 0; i < quantity; i += 1) {
        const momentInTime = Math.random() < 0.5 ? 'past' : 'future';
        eventsData.push({
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(10),
          happensAt: new Date(faker.date[momentInTime]()),
          platform: getRandomPlatform(),
          url: faker.internet.url(),
          photo: `https://loremflickr.com/800/400/logo?lock=${faker.random.number({ min: 1, max: 1000 })}`,
          registration: Math.random() < 0.5 ? faker.internet.url() : '',
          organizationId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return queryInterface.bulkInsert('events', eventsData);
    })
    return Promise.all(eventsBulkInsertPromises);
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
