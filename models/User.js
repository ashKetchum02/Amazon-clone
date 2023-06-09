const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        min: 6,
        },
        phone: {
            type:String,
        },
        orderHistory: {
            type: Array,
            default: []
        },
        address: {
            type: Array,
            default: []
        },
        executive: {
            type: String
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);