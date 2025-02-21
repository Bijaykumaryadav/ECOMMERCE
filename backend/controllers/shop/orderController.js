const {sendResponse} = require("../../utils/sendResponse");
const paypal = require("../.../helpers/paypal");
const Order = require("../../models/Order");


const createOrder = async(req,res) => {
    try{
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            totalAmount ,
            orderDate ,
            orderUpdateDate ,
            paymentId ,
            payerId } = req.body;

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method : 'paypal'
        },
        redirect_urls: {
            return_url : 'http://localhost:5173/shop/paypal-return',
            cancel_url : 'http://localhost:5173/shop/paypal-cancel'
        },
        transactions : [
            {
              item_list : {
                items : cartItems.map(item => ({
                    name : item.title,
                    sku : item.productId,
                    price : item.price.toFixed(2),
                    currency : 'USD',
                    quantity : item.quantity                    
                }))
              },
              amount : {
                currency: 'USD',
                total : totalAmount.toFixed(2)
              },
              description : 'description'
            }
        ]
    }

    paypal.payment.create(create_payment_json,async(error,paymentInfo) => {
        if(error){
            console.log(error);

            return sendResponse(
            res,
            400,
            false,
            "Error while creating paypal payment",
            null,
            null
            ) 
        }else{
            const newlyCreatedOrder = new Order({
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            totalAmount ,
            orderDate ,
            orderUpdateDate ,
            paymentId ,
            payerId
            })

            await newlyCreatedOrder.save();

            const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;

            return sendResponse(
                res,
                200,
                true,
                "success",
                {approvalURL,
                orderId: newlyCreatedOrder._id},
                null
            )
        }
    })
    }catch(error){
        console.log("Error is:"error);
        return sendResponse(
          res,
          400,
          false,
          "Some Error occured!",
          null,
          null
        )
    }
}

const capturePayment = async(req,res) => {
    try{

    }catch(error){
        console.log("Error is:"error);
        return sendResponse(
          res,
          400,
          false,
          "Some Error occured!",
          null,
          null
        )
    }
}

module.exports = {createOrder,capturePayment};