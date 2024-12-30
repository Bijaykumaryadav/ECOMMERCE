const { sendResponse } = require("../../utils/sendResponse");
const Product = require("../../models/Products");

const getFilteredProducts = async(req,res) => {
    try{

      const {category = [],brand = [],sortBy = "price-lowtohigh"} = req.query;
      let filters = {};
      if(category.length){
        filters.category = {$in: category.split(',')};
      }

      if(brand.length){
        filters.brand = {$in: brand.split(',')};
      }

      let sort = {}

      switch(sortBy){
        case "price-lowtohigh":
          sort.price = 1;
          break;
        case "price-hightolow":
          sort.price = -1;
          break;
        case "title-atoz":
          sort.title = 1;
          break;
        case "title-ztoa":
          sort.title = -1;
          break;
          default:
            sort.price = 1;
            break;
      }

        const data = await Product.find(filters).sort(sort);

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

const getProductDetails = async(req,res) => {
  try{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
      return sendResponse(
        res,
        404,
        false,
        "Not found any products",
        null,
        null
      );
    }
    return sendResponse(
      res,
      200,
      true,
      "Sucessfully got the product details",{data:product},
      null
    );
  }catch(error){
    console.log("error is",error);
    return sendResponse(
      res,
      500,
      false,
      "Error in getting details of products",
      null,
      { error }
    );  
  }
}

module.exports = {getFilteredProducts,getProductDetails};