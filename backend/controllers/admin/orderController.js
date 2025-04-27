const Order = require("../../models/Order");
const { sendResponse } = require("../../utils/sendResponse");


const getAllOrdersOfAllUsers = async (req, res) => {
  try {

    const orders = await Order.find({ });
    console.log("all orders is:",orders);

    if (!orders.length) {
      return sendResponse(res,404,false,"No Orders found!",null,null);
    }
    return sendResponse(res,200,true,"Successfully Fetched All Orders",{data: orders},null);
  } catch (e) {
    console.log(e);
    return sendResponse(res,500,false,"Some Error Occured!",null,{e});
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return sendResponse(res,404,false,"No Orders found!",null,null);
    }

    return sendResponse(res,200,true,"Successfully Fetched All Orders",{data: order},null);
  } catch (e) {
    console.log(e);
    return sendResponse(res,500,false,"Some Error Occured!",null,{e});
  }
};

const updateOrderStatus = async(req,res) => {
  try{
    const {id} = req.params;
    const {orderStatus} = req.body;
    const order = await Order.findById(id);

    if (!order) {
      return sendResponse(res,404,false,"No Orders found!",null,null);
    }

    await Order.findByIdAndUpdate(id,{orderStatus})

    return sendResponse(res,200,true,"Order status updated successfully",null,null);

  }catch(e){
    console.log(e);
    return sendResponse(res,500,false,"Some Error Occured!",null,{e});
  }
}

module.exports = {getAllOrdersOfAllUsers , getOrderDetails , updateOrderStatus}