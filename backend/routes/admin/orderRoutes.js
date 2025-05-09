const express = require("express");

const {getAllOrdersOfAllUsers , getOrderDetails , updateOrderStatus} = require('../../controllers/admin/orderController');

const router = express.Router();

router.get("/get",getAllOrdersOfAllUsers);
router.get("/details/:id",getOrderDetails);
router.put("/update/:id",updateOrderStatus);

module.exports = router;