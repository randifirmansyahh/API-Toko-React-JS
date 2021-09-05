var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const model = require("../models/index");

router.get("/", getAll);
router.put("/:id", setAsRead);

async function getAll(req, res, next) {
  try {
    const notifications = await model.notifications.findAll({
      where: {
        customer_id: req.userId,
      },
      order: [["createdAt", "desc"]],
      order: [["status", "asc"]],
    });
    res.json({
      status: "OK",
      messages: "",
      data: notifications,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
    });
  }
}

async function setAsRead(req, res, next) {
  try {
    const notificationId = req.params.id;
    const { status } = req.body;
    const notifications = await model.notifications.update(
      {
        status: 1,
      },
      {
        where: {
          id: notificationId,
          status: 0,
        },
      }
    );
    if (notifications) {
      res.json({
        status: "OK",
        messages: "Notifikasi berhasil diupdate",
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
