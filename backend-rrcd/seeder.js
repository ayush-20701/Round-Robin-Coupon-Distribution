const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Coupon = require("./models/coupons");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedCoupons = async () => {
    try {
        await Coupon.deleteMany(); // Clear existing coupons
        await Coupon.insertMany([
            { code: "DISCOUNT10" },
            { code: "DISCOUNT20" },
            { code: "FREESHIP" },
        ]);
        console.log("Coupons added");
        mongoose.disconnect();
    } catch (error) {
        console.error("Seeding error:", error);
        mongoose.disconnect();
    }
};

seedCoupons();