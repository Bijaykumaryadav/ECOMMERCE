const express = require("express");
const authRoute = require("./users/authRouter");
const adminRoute = require("./admin/index");
const shopRoute = require("./shop/index");
const featureRoute = require("./common/featureRoute");
const router = express.Router();

router.use("/users",authRoute);
router.use("/shop",shopRoute);
router.use("/admin",adminRoute);
router.use("/common/feature",featureRoute)

module.exports = router;