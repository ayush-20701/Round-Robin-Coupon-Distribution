import axios from "axios";

const API_URL = "https://round-robin-coupon-distribution.onrender.com/api";

export const claimCoupon = async () => {
    try {
        const response = await axios.get(`${API_URL}/claim`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { message: error.response?.data?.message || "Error claiming coupon" };
    }
};
