"use strict";
const slugify = require("slugify");
const faker = require("faker");
const model = require("../models/index");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const images = [
  "https://ik.imagekit.io/duogwqkwlvc/product-30dcc6c6-fb18-11eb-b192-9540dfd55f10_JBwXG45ucBs.webp",
  "https://ik.imagekit.io/duogwqkwlvc/product-edc5a33c-fb15-11eb-9608-f1ad5425255a_DzFeTKcM7g.webp",
  "https://ik.imagekit.io/duogwqkwlvc/product-7c19c77a-fb17-11eb-bb9a-fda9eaf422ef_zWbMufdcAiV.webp",
  "https://ik.imagekit.io/duogwqkwlvc/product-2f91bb78-fb18-11eb-88e8-dd6da374616c_8N88gMfZd8.webp",
  "https://ik.imagekit.io/duogwqkwlvc/product-7abb2a04-fb17-11eb-b68f-f31413319bf8_f5yQuG8u5B.webp",
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await model.categories.findAll({});

    const products = [...Array(10)].map(() => {
      let name = faker.commerce.productName();
      return {
        id: faker.datatype.uuid(),
        name: name,
        price: 45000,
        image: images[getRandomInt(images.length)],
        slug: slugify(name),
        category_id: categories[getRandomInt(categories.length)].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("products", products, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
