var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const model = require("../models/index");
const authMiddleware = require("../middleware/auth");

router.post("/signin", signin);
router.get("/me", [authMiddleware.verifyToken], getMe);

async function signin(req, res, next) {
  try {
    const user = await model.users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "ERROR",
        messages: "User tidak terdaftar",
      });
    }

    const isValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isValid) {
      return res.status(400).json({
        status: "ERROR",
        messages: "Password tidak valid",
      });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      status: "OK",
      messages: "Login Berhasil",
      data: {
        email: user.email,
        name: user.name,
        address: user.address,
        token,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await model.users.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "ERROR",
        messages: "User tidak terdaftar",
      });
    }

    res.json({
      status: "OK",
      messages: "User terdaftar",
      data: {
        email: user.email,
        name: user.name,
        address: user.address,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
