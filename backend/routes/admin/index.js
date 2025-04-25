const express = require("express");
const productsRoute = require("./products/productsRouter");
const orderRoutes = require("./orderRoutes");

const router = express.Router();

router.use("/products",productsRoute);
router.use("/order",orderRoutes);

module.exports = router