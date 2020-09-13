'use strict';

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
    const organizationsArray = [];

    organizationsArray.push({
      name: 'DCC',
      description: 'Departamento de Ciencia de la Computación de la Pontificia Universidad Católica de Chile',
      url: 'https://dcc.ing.puc.cl/',
      logo: 'https://instagram.fscl25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/69871149_2406706126325144_1711038150941343744_n.jpg?_nc_ht=instagram.fscl25-1.fna.fbcdn.net&_nc_ohc=sk4qY9fzOuUAX_xpB-D&oh=31eee3e59d7e41f2fdf99a2332cf77da&oe=5F821A60',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    organizationsArray.push({
      name: 'IMFD',
      description: 'Instituto Milenio Fundamentos de los Datos',
      url: 'https://imfd.cl/',
      logo: 'https://imfd.cl/wp-content/themes/understrap-child/images/header-logo-en.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('organizations', organizationsArray);
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
