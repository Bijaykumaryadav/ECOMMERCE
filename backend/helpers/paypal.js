const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.sandboxEnvironment(
    "AXzMxDPgAKUTJ9E-4cd5O17WcPT6LnMcfutO3xqof3i_HeUXCliVNH84RDXNwK1XlTNEF5sMy89CF_1S",
    "EDbWFsvnmCe-W96l_QbaqN3LwvFOGZX1PzAQLQ8wnmLO1ZVwxf-4QF7gV5M_47CuvK9uv1tHMNDWtXcF"
)

// Use `LiveEnvironment` for production
const paypal = new paypal.core.PayPalHttpClient(environment);

module.exports = paypal;