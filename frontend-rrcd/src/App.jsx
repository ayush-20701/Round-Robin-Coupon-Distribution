import React, { useState } from "react";
import { claimCoupon } from "./api/couponApi";

function App() {
    const [message, setMessage] = useState("");

    const handleClaim = async () => {
        const result = await claimCoupon();
        setMessage(result.message);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Coupon Distribution</h1>
            <button onClick={handleClaim} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Claim Coupon
            </button>
            <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>{message}</p>
        </div>
    );
}

export default App;
