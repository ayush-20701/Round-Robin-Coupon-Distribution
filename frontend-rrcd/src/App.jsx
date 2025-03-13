import React, { useState, useEffect } from "react";
import { getCoupons, claimCoupon } from "./api/couponApi";

function App() {
    const [coupons, setCoupons] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCoupons = async () => {
            const data = await getCoupons();
            setCoupons(data);
        };
        fetchCoupons();
    }, []);

    const handleClaim = async () => {
        const result = await claimCoupon();
        setMessage(result.message);
        setCoupons(await getCoupons()); // Refresh coupon list after claiming
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Coupon Distribution</h1>
            
            <button onClick={handleClaim} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Claim Coupon
            </button>
            
            <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>{message}</p>

            <h2>Available Coupons:</h2>
            <ul>
                {coupons.length > 0 ? coupons.map((coupon) => (
                    <li key={coupon._id}>{coupon.code}</li>
                )) : <p>No available coupons</p>}
            </ul>
        </div>
    );
}

export default App;
