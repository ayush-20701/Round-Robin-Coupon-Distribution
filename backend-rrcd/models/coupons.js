const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    assignedTo: { type: String, default: null }, // Stores user identifier (IP/Cookie)
    assignedAt: { type: Date, default: null }, // Timestamp of assignment
});

module.exports = mongoose.model("Coupon", couponSchema);
