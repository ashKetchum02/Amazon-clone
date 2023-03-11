const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }, 
    otp: {
        type: String,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
})

module.exports = mongoose.model("OTP", OTPSchema)