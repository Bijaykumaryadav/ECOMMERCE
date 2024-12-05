const { imageUploadUtil } = require("../../helpers/cloudinary");
const { sendResponse } = require("../../utils/sendResponse");

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
const fetchAllProducts = async(req,res) => {
  try{
    const listOfProducts = await Product.find({});
    return sendResponse(res,200,true,"Successfully fetched Products",{listOfProducts},null);
  }catch(error){
    return sendResponse(res,500,false,"Error in fetching Products",null,{error});
  }
}

//edit a products
const editProducts = async(req,res) => {
  try{
    
  }catch(error){
    return sendResponse(res,500,false,"Error in editing Products",null,{error});
  }
}

//delete a products
const deleteProducts = async(req,res) => {
  try{

  }catch(error){
    return sendResponse(res,500,false,"Error in deleting Products",null,{error});
  }
}

module.exports = { handleImageUpload,addProducts,fetchAllProducts,editProducts ,deleteProducts };
