var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const model = require("../models/index");

router.get("/", getAll);
router.post("/", add);
router.get("/:id", getById);

async function getAll(req, res, next) {
  try {
    const orders = await model.orders.findAll({
      include: [
        {
          model: model.carts,
          attributes: ["id", "quantity"],
          include: [
            {
              model: model.products,
              as: "product",
              attributes: ["name", "price", "image"],
            },
          ],
        },
      ],
      order: [["createdAt", "desc"]],
      where: {
        customer_id: req.userId,
      },
    });
    res.json({
      status: "OK",
      messages: "",
      data: orders,
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
    const status = 0;
    const customer_id = req.userId;

    const cartsCount = await model.carts.count({
      where: {
        customer_id,
        status: 0,
      },
    });

    if (cartsCount > 0) {
      const orderId = uuidv4();
      const orders = await model.orders.create({
        id: orderId,
        customer_id,
        status,
      });

      if (orders) {
        await model.carts.update(
          {
            status: 1,
            order_id: orderId,
          },
          {
            where: {
              status: 0,
              customer_id,
            },
          }
        );

        const notificationId = uuidv4();
        await model.notifications.create({
          id: notificationId,
          customer_id,
          order_id: orderId,
          message: "Pesanan Anda sudah dibuat, silakan lakukan pembayaran",
          status: 0,
        });

        res.status(201).json({
          status: "OK",
          messages: "Checkout berhasil",
        });
      }
    } else {
      res.status(400).json({
        status: "ERROR",
        messages: "Keranjang masih kosong",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

async function getById(req, res, next) {
  try {
    const order = await model.orders.findByPk(req.params.id);
    res.json({
      status: "OK",
      messages: "",
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

module.exports = router;
