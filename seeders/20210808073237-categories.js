"use strict";
const faker = require("faker");
const categories = [...Array(3)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.color(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", categories, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
