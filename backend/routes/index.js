const express = require("express");
const authRoute = require("./users/authRouter");
const router = express.Router();

router.use("/users",authRoute);

module.exports = router;