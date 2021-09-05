var express = require("express");
var router = express.Router();
const model = require("../models/index");

router.get("/", getAll);
router.get("/:slug", getBySlug);

async function getAll(req, res, next) {
  try {
    let options = {};

    if (req.query.category_id) {
      options.where = {
        category_id: req.query.category_id,
      };
    }

    if (req.query.limit) {
      options.limit = parseInt(req.query.limit);
      options.offset = parseInt(req.query.offset);
    }

    options.include = [
      {
        model: model.categories,
        as: "category",
        attributes: ["name"],
      },
    ];

    const products = await model.products.findAll(options);
    res.json({
      status: "OK",
      messages: "",
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

async function getBySlug(req, res, next) {
  try {
    const products = await model.products.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [
        {
          model: model.categories,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json({
      status: "OK",
      messages: "",
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

module.exports = router;
