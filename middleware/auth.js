const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      status: "ERROR",
      messages: "No token provided!",
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "ERROR",
        messages: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authMiddleware = {
  verifyToken,
};

module.exports = authMiddleware;
