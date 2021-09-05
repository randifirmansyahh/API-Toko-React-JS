var express = require("express");
var router = express.Router();
const model = require("../models/index");

router.get("/", getAll);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", remove);

async function getAll(req, res, next) {
  try {
    const categories = await model.categories.findAll({});
    res.json({
      status: "OK",
      messages: "",
      data: categories,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

async function add(req, res, next) {
  try {
    const { name } = req.body;
    const categories = await model.categories.create({
      name,
    });

    if (categories) {
      res.status(201).json({
        status: "OK",
        messages: "Kategori berhasil ditambahkan",
        data: categories,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

async function update(req, res, next) {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const categories = await model.categories.update(
      {
        name,
      },
      {
        where: {
          id: categoryId,
        },
      }
    );
    if (categories) {
      res.json({
        status: "OK",
        messages: "Kategori berhasil diupdate",
        data: categories,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

async function remove(req, res, next) {
  try {
    const categoryId = req.params.id;
    const categories = await model.categories.destroy({
      where: {
        id: categoryId,
      },
    });
    if (categories) {
      res.json({
        status: "OK",
        messages: "Kategori berhasil dihapus",
        data: categories,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

module.exports = router;
