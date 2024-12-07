const { imageUploadUtil } = require("../../helpers/cloudinary");
const { sendResponse } = require("../../utils/sendResponse");
const Product = require("../../models/Products");

const handleImageUpload = async (req, res) => {
  try {
    // Ensure a file is received
    if (!req.file) {
      return sendResponse(res, 400, false, "No file uploaded", null, null);
    }

    // Convert the file buffer to a Base64 string
    const b64 = req.file.buffer.toString("base64");

    // Create the Base64 URL format for Cloudinary
    const base64URL = `data:${req.file.mimetype};base64,${b64}`;

    // Log the Base64 URL for debugging (optional)
    // console.log("Base64 URL is:", base64URL);

    // Upload the image to Cloudinary
    const result = await imageUploadUtil(base64URL);

    // Return success response
    return sendResponse(
      res,
      200,
      true,
      "Successfully uploaded the image",
      result,
      null
    );
  } catch (error) {
    console.error("Error in image upload:", error);

    // Return error response
    return sendResponse(
      res,
      500,
      false,
      "Error in uploading image",
      null,
      { error }
    );
  }
};

//add a new product
const addProducts = async(req,res) => {
  try{
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body;
    if(!image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price || 
      !salePrice || 
      !totalStock){
      return sendResponse(
        res,
        400,
        false,
        "Products details should be required",
        null
      );
    }
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    })
    await newlyCreatedProduct.save();
    return sendResponse(res,201,true,"Successfully added the products",{data},null);
  }catch(error){
    return sendResponse(res,500,false,"Error in adding Products",null,{error});
  }
}

//fetch all products 
const fetchAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const listOfProducts = await Product.find({});

    // Check if the list is empty
    if (!listOfProducts || listOfProducts.length === 0) {
      return sendResponse(res, 404, false, "No products found", [], null);
    }

    console.log("product list is:",listOfProducts);

    // Return the list of products
    return sendResponse(res, 200, true, "Products retrieved successfully", {
      listOfProducts,
    });
  } catch (error) {
    console.error("Error in fetching products:", error);

    // Return error response
    return sendResponse(
      res,
      500,
      false,
      "Error in fetching products",
      null,
      { message: error.message } // Avoid exposing full error stack in production
    );
  }
};


//edit a products
const editProducts = async(req,res) => {
  try{
    const {id} = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body;
    const findProduct = await Product.findById(id);
    if(!findProduct){
      return sendResponse(res,404,false,"Associated Product Id not found",null,null);
    }
    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price || findProduct.v
    findProduct.salePrice = salePrice || findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock
    findProduct.image = image || findProduct.image

    await findProduct.save();

    return sendResponse(res,200,true,"SuccessFully Updated the products",{findProduct},null);

  }catch(error){
    return sendResponse(res,500,false,"Error in editing Products",null,{error});
  }
}

//delete a products
const deleteProducts = async(req,res) => {
  try{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id);
    if(!product) {
      return sendResponse(res,404,false,"Not founding the associated products",null,null);
    }

    return sendResponse(res,200,true,"Products deleted Successfully",null,null);

  }catch(error){
    return sendResponse(res,500,false,"Error in deleting Products",null,{error});
  }
}

module.exports = { handleImageUpload,addProducts,fetchAllProducts,editProducts ,deleteProducts };
