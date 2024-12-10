const express = require("express");
const authRoute = require("./users/authRouter");
const adminRoute = require("./admin/index");
const shopRoute = require("./shop/index");
const router = express.Router();

router.use("/users",authRoute);
router.use("/shop",)
router.use("/admin",adminRoute);

module.exports = router;