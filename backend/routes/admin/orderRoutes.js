const express = require("express");

const {getAllOrdersOfAllUsers , getOrderDetails} = require('../../controllers/admin/orderController');

const router = express.Router();

router.get("/get",getAllOrdersOfAllUsers);
router.get("/details/:id",getOrderDetails);

module.exports = router;