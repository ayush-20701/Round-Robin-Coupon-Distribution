import React, { useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");

    const claimCoupon = async () => {
        try {
            const res = await axios.get("http://localhost:5000/");
            setMessage(res.data);
        } catch (error) {
            setMessage("Error claiming coupon");
        }
    };

    return (
        <div>
            <h1>Coupon Distribution</h1>
            <button onClick={claimCoupon}>Claim Coupon</button>
            <p>{message}</p>
        </div>
    );
}

export default App;