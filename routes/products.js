require('dotenv').config()

const Product = require("../models/Product")
const router = require("express").Router();
const bcrypt = require("bcrypt")
const multer = require('multer');

const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10000000 }
});

const cloudinary = require("cloudinary")

cloudinary.config({ 
    cloud_name: 'dmquzvi22', 
    api_key: process.env.cloudinaryApiKey, 
    api_secret: process.env.cloudinaryApiSecret
});


router.post("/add", uploader.single("file"), async (req, res) => {
    try {

        if (req.body.productId != "") {

             const upload = await cloudinary.v2.uploader.upload(req.file.path);
            
            const product = await Product.findOne({_id: req.body.productId})

            await product.updateOne({$push: {images: upload.secure_url}})

            res.status(200).json("Success")

            return;
        }

        const upload = await cloudinary.v2.uploader.upload(req.file.path);

        const newProduct = new Product({
            name: req.body.name,
            desc: req.body.desc,
            rating: req.body.rating,
            images: [upload.secure_url],
            manufacturer: req.body.manufacturer,
            brand: req.body.brand,
            modelNumber: req.body.modelNumber,
            packageDimensions: req.body.packageDimensions,
            color: req.body.color,
            materialType: req.body.materialType,
            size: req.body.size,
            itemWeight: req.body.itemWeight,
        })

        await newProduct.save()

        res.status(200).json("Success")

    } catch(err) {
        console.log(err);
        res.status(500).json("Error")
    }
})

router.get("/getProduct", async (req, res) => {
    try {

        const product = await Product.find({_id: req.body.productId});

        res.status(200).json(product);

    } catch(err) {
        console.log(err)
    }
});

router.get("/getAllProducts", async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch(err) {
        console.log(err)
    }
});

module.exports = router