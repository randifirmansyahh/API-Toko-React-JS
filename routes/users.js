var express = require("express");
var router = express.Router();
const model = require("../models/index");

router.put("/", update);

async function update(req, res, next) {
  try {
    const { name, email, address } = req.body;

    const users = await model.users.update(
      {
        name,
        email,
        address,
      },
      {
        where: {
          id: req.userId,
        },
      }
    );

    if (users) {
      res.status(201).json({
        status: "OK",
        messages: "User berhasil diupdate",
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
