const { sendResponse } = require("../../utils/sendResponse");
const Product = require("../../models/Products");

const getFilteredProducts = async(req,res) => {
    try{
        const data = await Product.find({})

        return sendResponse(res,200,true,"Successfully fetched products",{data},null);
    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in fetching products",
      null,
      { error }
    );
    }
}

module.exports = {getFilteredProducts};