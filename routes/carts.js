var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const model = require("../models/index");

router.get("/", getAll);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

async function getAll(req, res, next) {
  try {
    const carts = await model.carts.findAll({
      where: {
        customer_id: req.userId,
        status: 0,
      },
      include: model.products,
    });
    res.json({
      status: "OK",
      messages: "",
      data: carts,
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
    const { product_id, quantity } = req.body;
    const status = 0;

    const cart = await model.carts.findOne({
      where: {
        customer_id: req.userId,
        product_id,
        status: 0,
      },
    });

    if (cart) {
      const carts = await model.carts.update(
        {
          quantity: quantity + cart.quantity,
        },
        {
          where: {
            id: cart.id,
          },
        }
      );

      if (carts) {
        res.status(201).json({
          status: "OK",
          messages: "Keranjang berhasil ditambahkan",
          data: carts,
        });
      }
    } else {
      const carts = await model.carts.create({
        id: uuidv4(),
        customer_id: req.userId,
        product_id,
        quantity,
        status,
      });

      if (carts) {
        res.status(201).json({
          status: "OK",
          messages: "Keranjang berhasil ditambahkan",
          data: carts,
        });
      }
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
    const cartId = req.params.id;
    const { quantity } = req.body;
    const carts = await model.carts.update(
      {
        quantity,
      },
      {
        where: {
          id: cartId,
          status: 0,
        },
      }
    );
    if (carts) {
      res.json({
        status: "OK",
        messages: "Keranjang berhasil diupdate",
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
    const cartId = req.params.id;
    const carts = await model.carts.destroy({
      where: {
        id: cartId,
      },
    });
    if (carts) {
      res.json({
        status: "OK",
        messages: "Keranjang berhasil dihapus",
        data: carts,
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
