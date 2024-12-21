const express = require("express");
const productsRoute = require("./products/productsRouter");
const cartRoute = require("./carts/cartsRouter")
const router = express.Router();

router.use("/products",productsRoute);
router.use("/cart",cartRoute);

module.exports = router