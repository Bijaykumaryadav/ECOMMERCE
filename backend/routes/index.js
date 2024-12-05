const express = require("express");
const authRoute = require("./users/authRouter");
const adminRoute = require("./admin/index");
const router = express.Router();

router.use("/users",authRoute);
router.use("/admin",adminRoute);

module.exports = router;