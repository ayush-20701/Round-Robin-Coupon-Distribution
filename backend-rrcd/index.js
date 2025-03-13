require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors({origin: true, credentials: true}))
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api', require('./routes/couponRoutes'))

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));