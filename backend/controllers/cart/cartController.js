const { sendResponse } = require("../../utils/sendResponse");
const Product = require("../../models/Products");
const Cart = require("../../models/Cart");


const addToCart = async(req,res) => {
    try{
      const {userId,productId,quantity} = req.body;
      if(!userId || !productId || quantity <= 0){
        return sendResponse(
          res,
          400,
          false,
          "Invalid data provided",
          null,
          null
        );
      }

      const product = await Product.findById(productId);
      if(!product){
        return sendResponse(
          res,
          404,
          false,
          "Product not found",
          null,
          null
        );
      }

      let cart = await Cart.findOne({userId});

      if(!cart){
        cart = new Cart({userId,items:[]})
      }

      const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if(findCurrentProductIndex === -1){
        cart.items.push({productId,quantity})
      }else{
        cart.items[findCurrentProductIndex].quantity += quantity;
      }

      await cart.save();
      return sendResponse(
        res,
        200,
        true,
        "Product added to cart successfully",
        {cart},
        null
      );
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
      const {userId} = req.params;

      if(!userId){
        return sendResponse(
        res,
        400,
        false,
        "UserId not found",
        null,
        null
        );
      }

      const cart = await Cart.findOne({userId}).populate({
        path: 'item.productId',
        select: 'image title price salePrice'
      })

      if(!cart){
        return sendResponse(
          res,
          404,
          false,
          "Cart not found!",
          null,
          null
        );
      }

      const validItems = cart.items.filter(productItem => productItem.productId);

      if(validItems.length < cart.items.length){
        cart.items = validItems
        await cart.save();
      }

      const populateCartItems = validItems.map(item => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      }))


      return sendResponse(
        res,
        200,
        true,
        "Successfully fetched the Cart Items",
        {data: {
          ...cart._doc,
          items: populateCartItems
        }},
        null
      );

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
      const {userId,productId,quantity} = req.body;
      if(!userId || !productId || quantity <= 0){
        return sendResponse(
          res,
          400,
          false,
          "Invalid data provided",
          null,
          null
        );
      }

      const cart = await Cart.findOne({userId});
        if(!cart){
        return sendResponse(
          res,
          404,
          false,
          "Cart not found",
          null,
          null
        );
      }

      const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if(findCurrentProductIndex === -1){
        return sendResponse(
          res,
          404,
          false,
          "Cart item is not present",
          null,
          null
        )
      }

      cart.items[findCurrentProductIndex].quantity = quantity;
      await cart.save();

      await cart.populate({
        path: 'items.productId',
        select: 'image title price salePrice'
      })

      const populateCartItems = cart.items.map(item => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : null,
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      }));

      return sendResponse(
        res,
        200,
        true,
        "Successfully Updated the Cart Items",
        {data: {
          ...cart._doc,
          items: populateCartItems
        }},
        null
      );

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

      const {userId,productId} = req.params;

      if(!userId || !productId){
        return sendResponse(
          res,
          400,
          false,
          "Invalid data provided",
          null,
          null
        );
      }

      const cart = await Cart.findOne({userId}).populate({
        path: "items.productId",
        select: "image title price salePrice",
      })

      cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

      await cart.save();

        await cart.populate({
        path: 'items.productId',
        select: 'image title price salePrice'
      })

      const populateCartItems = cart.items.map(item => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : null,
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      }));

      return sendResponse(
        res,
        200,
        true,
        "Successfully deleted the Cart Items",
        {data: {
          ...cart._doc,
          items: populateCartItems
        }},
        null
      );


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