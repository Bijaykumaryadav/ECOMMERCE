const express = require("express");
const {
    handleImageUpload,
    addProducts,
    editProducts,
    fetchAllProducts,
    deleteProducts
} = require("../../../controllers/admin/productController");
const {upload} = require("../../../helpers/cloudinary");
const router = express.Router();


router.post('/upload-image',upload.single('my_file'),handleImageUpload);
router.post("/add",addProducts);
router.post("/edit/:id",editProducts);
router.delete("/delete/:id", deleteProducts); 
router.get("/get",fetchAllProducts);

module.exports = router;