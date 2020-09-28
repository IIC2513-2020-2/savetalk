// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const ORGS_QUANTITY = 10;
    const initialData = [
      {
        name: 'DCC',
        description: faker.lorem.sentences(5),
        url: 'https://dcc.ing.puc.cl/',
        logo: 'https://instagram.fscl25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/69871149_2406706126325144_1711038150941343744_n.jpg?_nc_ht=instagram.fscl25-1.fna.fbcdn.net&_nc_ohc=sk4qY9fzOuUAX_xpB-D&oh=31eee3e59d7e41f2fdf99a2332cf77da&oe=5F821A60',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'IMFD',
        description: faker.lorem.sentences(5),
        url: 'https://imfd.cl/',
        logo: 'https://imfd.cl/wp-content/themes/understrap-child/images/header-logo-en.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const organizationsArray = [...initialData];

    for (let i = 0; i < ORGS_QUANTITY - 2; i += 1) {
      organizationsArray.push({
        name: faker.company.companyName(),
        description: faker.lorem.sentences(5),
        url: faker.internet.url(),
        logo: `https://loremflickr.com/320/320/logo?lock=${faker.random.number({ min: 1, max: 1000 })}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('organizations', organizationsArray);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
