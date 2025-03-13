const express = require("express");
const Coupon = require("../models/coupons");
const router = express.Router();

// Helper function to get the next available coupon
const getNextCoupon = async () => {
    return await Coupon.findOne({ assignedTo: null }).sort({ _id: 1 }); // FIFO assignment
};

// Claim coupon API
router.get("/claim", async (req, res) => {
    try {
        const userIP = req.ip; // Get user IP address

        const userCookie = req.cookies.claimed_coupon; // Get cookie from request

        console.log("User IP:", userIP);
        console.log("User Cookie:", userCookie);

        // If cookie exists, prevent duplicate claims
        if (userCookie) {
            return res.status(400).json({ message: "You have already claimed a coupon. Try again later." });
        }

        // Check if the user has claimed a coupon recently based on IP
        const lastClaim = await Coupon.findOne({ assignedTo: userIP }).sort({ assignedAt: -1 });
        if (lastClaim && new Date() - lastClaim.assignedAt < 3600000) { // 1-hour restriction
            const timeLeft = Math.ceil((3600000 - (new Date() - lastClaim.assignedAt)) / 60000);
            return res.status(400).json({ message: `Try again in ${timeLeft} minutes` });
        }

        // Get next available coupon
        const coupon = await Coupon.findOne({ assignedTo: null }).sort({ _id: 1 });
        if (!coupon) return res.status(400).json({ message: "No coupons available" });

        // Assign the coupon
        coupon.assignedTo = userIP;
        coupon.assignedAt = new Date();
        await coupon.save();

        // Set a cookie to track this user (expires in 1 hour)
        res.cookie("claimed_coupon", "true", { maxAge: 3600000, httpOnly: true });

        res.json({ message: `Coupon assigned: ${coupon.code}` });
    } catch (error) {
        console.error("Error assigning coupon:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/coupons", async (req, res) => {
    try {
        const availableCoupons = await Coupon.find({ assignedTo: null }); // Fetch unclaimed coupons
        res.json(availableCoupons);
    } catch (error) {
        console.error("Error fetching coupons:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;