const express = require("express");
const productsRoute = require("./products/productsRouter");
const router = express.Router();

router.use("/products",productsRoute);

module.exports = router