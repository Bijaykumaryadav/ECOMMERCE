const { sendResponse } = require("../../utils/sendResponse");
const client = require("../../helpers/paypal");
const Order = require("../../models/Order");
const paypal = require("@paypal/checkout-server-sdk");

// Create PayPal Order
const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate
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
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId: order.result.id, // Store PayPal Order ID
            payerId: null,
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

// Capture Payment
const capturePayment = async (req, res) => {
    try {
        const { orderId } = req.body; // Order ID from frontend

        // Capture PayPal payment
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const captureResponse = await client.execute(request);
        const captureDetails = captureResponse.result;

        if (captureDetails.status === "COMPLETED") {
            // Update order in database
            await Order.findOneAndUpdate(
                { paymentId: orderId },
                { paymentStatus: "Paid", payerId: captureDetails.payer.payer_id }
            );

            return sendResponse(res, 200, true, "Payment Captured Successfully", captureDetails, null);
        } else {
            return sendResponse(res, 400, false, "Payment Capture Failed", null, null);
        }
    } catch (error) {
        console.error("Error capturing payment:", error);
        return sendResponse(res, 400, false, "Error capturing PayPal payment", null, null);
    }
};

module.exports = { createOrder, capturePayment };
