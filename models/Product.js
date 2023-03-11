const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    }, 
    desc: {
        type: String,
    },
    rating: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    manufacturer: {
        type: String,
        default: ""
    },
    brand: {
        type: String,
        default: ""
    },
    modelNumber: {
        type: String,
        default: ""
    },
    packageDimensions: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    materialType: {
        type: String,
        default: ""
    },
    size: {
        type: String,
        default: ""
    },
    itemWeight: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Product", ProductSchema)