'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [{
    name: 'Phillip Bryan',
    gender: 'Male',
    birthdate: '1945-08-17',
    email: 'phillip@briyan.com'
  },{
    name: 'Oky Wiliarso',
    gender: 'Male',
    birthdate: '1995-09-12',
    email: 'oky@wiliarso.com'
  },{
    name: 'Udin Sedunia',
    gender: 'Male',
    birthdate: '1990-08-12',
    email: 'udin@sedunia.com'
  },{
    name: 'Neil Tanado',
    gender: 'Male',
    birthdate: '1993-08-27',
    email: 'neil@tanado.com'
  },{
    name: 'Asep Ridwan',
    gender: 'Male',
    birthdate: '1989-02-17',
    email: 'asep@ridwan.com'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
