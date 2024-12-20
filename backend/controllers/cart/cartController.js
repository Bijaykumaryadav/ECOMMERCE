const { sendResponse } = require("../../utils/sendResponse");
const Product = require("../../models/Products");
const Cart = require("../../models/Cart");


const addToCart = async(req,res) => {
    try{

    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in Adding Cart",
      null,
      { error }
    );
    }
}

const fetchCartItems = async(req,res) => {
    try{

    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in fetching Cart",
      null,
      { error }
    );
    }
}

const updateCartItems = async(req,res) => {
    try{

    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in Updating Cart",
      null,
      { error }
    );
    }
}

const deleteCartItems = async(req,res) => {
    try{

    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in Deleting Cart",
      null,
      { error }
    );
    }
}

module.exports = {addToCart,fetchCartItems,updateCartItems,deleteCartItems};