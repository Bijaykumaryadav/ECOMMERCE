const express = require("express");
const {getFilteredProuducts} = require("../../../controllers/shop/productsController");
const router = express.Router();

router.get("/get",getFilteredProuducts);

module.exports = router;