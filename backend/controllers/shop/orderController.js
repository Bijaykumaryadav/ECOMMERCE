const { sendResponse } = require("../../utils/sendResponse");
const client = require("../../helpers/paypal");
const Order = require("../../models/Order");
const paypal = require("@paypal/checkout-server-sdk");
const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

// Create PayPal Order
const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        } = req.body;

        // Prepare PayPal Order Request
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalAmount.toFixed(2),
                    },
                    description: "Order Payment",
                },
            ],
            application_context: {
                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel",
            },
        });

        // Execute PayPal Order Creation
        const order = await client.execute(request);

        // Save Order in Database
        const newOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        });

        await newOrder.save();

        // Send PayPal approval URL
        const approvalURL = order.result.links.find(link => link.rel === "approve").href;
        return sendResponse(res, 200, true, "Success", { approvalURL, orderId: newOrder._id }, null);
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        return sendResponse(res, 400, false, "Error while creating PayPal payment", null, null);
    }
};

const capturePayment = async (req, res) => {
  const {payerId, paypalOrderId, orderId } = req.body; 

  try {
    const order = await Order.findById(orderId);
    console.log(order,"order is:");
    if (!order) {
      return sendResponse(res, 404, false, "Order not found", null, null);
    }

    if (order.paymentStatus === "Paid") {
    console.log(order,"order is:");
      await Cart.findByIdAndDelete(order.cartId);
      return sendResponse(res, 200, true, "Payment Already Captured", { status: "COMPLETED" }, null);
    }

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const captureResponse = await client.execute(request);
    const captureDetails = captureResponse.result;
    console.log("CaptureDetailis",captureDetails);

    if (captureDetails.status === "COMPLETED") {
      order.paymentStatus = "Paid";
      order.orderStatus = "Confirmed";
      order.paymentId = captureDetails.id;
      order.payerId = captureDetails.payer.payer_id;

      for (let item of order.cartItems) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return sendResponse(res, 404, false, `Product not found for ID: ${item.productId}`, null, null);
        }

        product.totalStock -= item.quantity;
        await product.save();
      }

      await Cart.findByIdAndDelete(order.cartId);
      await order.save();

      return sendResponse(res, 200, true, "Payment Captured Successfully", captureDetails, null);
    } else {
      return sendResponse(res, 400, false, "Payment Capture Failed", null, null);
    }

  } catch (error) {
    // ✅ `orderId` is now in scope here
    if (
      error.statusCode === 422 &&
      error._originalError &&
      error._originalError.text &&
      error._originalError.text.includes("ORDER_ALREADY_CAPTURED")
    ) {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = "Paid";
        order.orderStatus = "Confirmed";

        for (let item of order.cartItems) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.totalStock -= item.quantity;
            await product.save();
          }
        }

        await Cart.findByIdAndDelete(order.cartId);
        await order.save();
      }

      return sendResponse(res, 200, true, "Payment Already Captured", { status: "COMPLETED" }, null);
    }

    console.error("Error capturing PayPal payment:", error);
    return sendResponse(res, 400, false, "Error capturing PayPal payment", null, error.message);
  }
};



module.exports = { createOrder, capturePayment };
