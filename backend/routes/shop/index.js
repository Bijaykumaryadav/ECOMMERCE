const express = require("express");
const productsRoute = require("./products/productsRouter");
const cartRoute = require("./carts/cartsRouter")
const addressRoutes = require("./addressRoutes");
const orderRoutes = require("./orderRoutes");
const router = express.Router();

router.use("/products",productsRoute);
router.use("/cart",cartRoute);
router.use("/address",addressRoutes);
router.use("/order",orderRoutes);

module.exports = router