const mongoose = require("mongoose");

const AdderssSchema = new mongoose.Schema({
    userId : String,
    address : String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
},{timestamps: true})

module.exports = mongoose.model('Address',AdderssSchema);