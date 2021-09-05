"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const user = {
  id: faker.datatype.uuid(),
  name: "Pelatihan ReactJs",
  email: "user@reactjs.com",
  password: bcrypt.hashSync("rahasia", authConfig.salt),
  address: "Bandung, Indonesia",
  createdAt: new Date(),
  updatedAt: new Date(),
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [user], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", null, {});
  },
};
