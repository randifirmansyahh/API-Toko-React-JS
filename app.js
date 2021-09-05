const express = require("express");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const cartsRouter = require("./routes/carts");
const ordersRouter = require("./routes/orders");
const notificationsRouter = require("./routes/notifications");
const authRouter = require("./routes/auth");

const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

app.use("/users", [authMiddleware.verifyToken], usersRouter);
app.use("/carts", [authMiddleware.verifyToken], cartsRouter);
app.use("/notifications", [authMiddleware.verifyToken], notificationsRouter);
app.use("/orders", [authMiddleware.verifyToken], ordersRouter);
app.use("/auth", authRouter);

// start server
const port = 3200;
app.listen(port, function () {
  console.log("[toko-api] info: api server listening on :::" + port);
});
