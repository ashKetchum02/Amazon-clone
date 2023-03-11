require('dotenv').config()

const User = require("../models/User")
const OTP = require("../models/OTP")
const router = require("express").Router();
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const axios = require("axios")


router.post("/getUser", async function(req, res) {
    try {
        const user = await User.findOne({_id: req.body.userId});

        res.json({_id: user._id, username: user.username, email: user.email, phone: user.phone, address: user.address, orderHistory: user.orderHistory, executive: user.executive});

    } catch(err) {
        console.log(err)
    }
})

// Register a new user

router.post("/register", async function(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        const otp = await OTP.findOne({email: req.body.email});
        if (!otp) {
            res.json("OTP has expired");
            return;
        }
        if (!user) {
            const validOtp = await bcrypt.compare(req.body.otp, otp.otp);
            if (!validOtp) {
                res.json("Wrong OTP entered")
                return;
            }
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone ? req.body.phone : ""
            })

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            await newUser.save();
            await otp.deleteOne();
            res.status(200).json("successfully registered")
        }

        else {
            res.json("This email is already registered.");
        }
    } catch(err) {
        res.json(err);
    }
});

router.post("/registerFake", async function(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if (!user) {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone ? req.body.phone : "",
                executive: req.body.executive
            })

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            await newUser.save();
            res.status(200).json("successfully registered")
        }

        else {
            res.json("This email is already registered.");
        }
    } catch(err) {
        res.json(err);
    }
});


// User login

router.post("/login", async function(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if (!user) {
            res.json("Email not registered. Create an account and try again");
        }

        else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.json("Password is incorrect");
            } else {
                res.json({_id: user._id, username: user.username, email: user.email, phone: user.phone, address: user.address, orderHistory: user.orderHistory, executive: user.executive});
            }
        }

    } catch(err) {
        console.log(err);
        res.json(err)
    }
})


// User places a new order

router.put("/newOrder", async function(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if (!user) {
            res.status(404).json("Email not registered. Create an account and try again");
        }

        else {
            // console.log(req.body.newOrder);
            // await User.findOneAndUpdate({email: req.body.email}, {$push:{orderHistory:req.body.newOrder}});
            await user.updateOne({$push:{orderHistory:req.body.newOrder}});
            await user.save();
        }

    } catch(err) {
        console.log(err);
    }
});

// User tries to change password

router.put("/changePassword", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.json("user not found");
        }

        else {
            const validCurPass = await bcrypt.compare(req.body.curPass, user.password);
            if (!validCurPass) {
                res.json("You entered the wrong current password")
            } else {
                const salt = await bcrypt.genSalt(10);
                const newPass = await bcrypt.hash(req.body.newPass, salt);
                await user.updateOne({password: newPass});
                await user.save();
                res.json("Password changed");
            }
        }

    } catch(err) {
        console.log(err);
    }
})


// User tries to change username

router.put("/changeName", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(404).json("Email not registered. Create an account and try again");
        }

        else {
            await user.updateOne({username: req.body.newName});
            await user.save();
        }
        
    } catch(err) {
        res.status(500).json(err)
    }
});


// User tries to add a new address

router.post("/addAddress", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        // console.log("hello");
        if (!user) {
            res.json("user not found");
        }
        else {
            await user.updateOne({$push: {address: req.body.newAddress}});
            await user.save();
            // console.log("hi");
            res.json("address successfully saved")
        }
    } catch(err) {
        res.json(err)
    }
})


// Update Addresses 

router.put("/editAddress", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        await user.updateOne({$set: {address: req.body.newAddressArray}})
        await user.save();
        // console.log(req.body.newAddressArray);
        res.json("success")

    } catch(err) {
        res.json(err)
    }
})


// Verify otp sent to users mobile

router.post("/verifyMobileOtp", async (req, res) => {
    try {
        const otp = await OTP.findOne({email: req.body.email});
        const user = await User.findOne({email: req.body.email});

        if (!otp) {
            res.json("Otp has expired");
        } else if (!user) {
            res.json("email not registered")
        } else {
            const validOtp = await bcrypt.compare(req.body.otp, otp.otp);
            if (validOtp) {
                await otp.delete();
                await user.updateOne({phone: req.body.newPhone})
                res.json("success")
            } else {
                res.json("Wrong OTP entered")
            }
        }
    } catch(err) {
        res.json(err)
    }
})


// Verify otp sent to user's email

router.post("/verifyEmailOtp", async (req, res) => {
    try {
        const used = await User.findOne({email: req.body.newEmail})
        if (used == null) {
            const otp = await OTP.findOne({email: req.body.email});
            const user = await User.findOne({email: req.body.email});
            if (!otp) {
                res.json("OTP expired");
                return;
            }

            if (!user) {
                res.json("User not found");
                return;
            }

            else {
                const validOtp = await bcrypt.compare(req.body.otp, otp.otp);
                if (validOtp) {
                    await user.updateOne({email: req.body.newEmail});
                    await user.save()
                    await otp.deleteOne()
                    res.json("success")
                }

                else {
                    res.json("Wrong OTP entered")
                }
            }
        } 

        else {
            res.json("Email already in use")
        }
    } catch(err) {
        console.log(err);
    }
});


// Send an OTP to user's email

router.post("/sendEmailOtp", async (req, res) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    try {
        const user = await User.findOne({email: req.body.email});
        const otp = await OTP.findOne({email: req.body.email});

        const used = await User.findOne({email: req.body.newEmail});

        if (used) {
            res.json("Email already in use");
            return;
        }

        if (user && user.email == req.body.newEmail) {
            res.json("Email already in use")
            return;
        }

        if (otp) {
            const temp = (Math.ceil(Math.random() * 1000000)).toString();
            // console.log(temp);
            const salt = await bcrypt.genSalt(10);
            const update = await bcrypt.hash(temp, salt);
            await otp.updateOne({otp: update});
            await otp.save();

            let mailOptions = {
                from: "clone.fakemazon@gmail.com",
                to: req.body.newEmail,
                subject: "OTP for changing email registered to your fakemazon account",
                text: "Your OTP is " + temp + ". Valid for 5 mins"
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Done");
                }
            })
            res.json("success")
        }

        else if (!user) {
            res.json("Email not registered. Create an account and try again");
        }
        
        else {
            const temp = (Math.ceil(Math.random() * 1000000)).toString();

            let mailOptions = {
                from: "clone.fakemazon@gmail.com",
                to: req.body.newEmail,
                subject: "OTP for changing email registered to your fakemazon account",
                text: "Your OTP is " + temp + ". Valid for 5 mins"
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }

                else {
                    console.log("Done");
                }
            })
            
            const otp = new OTP({
                email: req.body.email,
                otp: temp
            });

            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt);

            await otp.save()
            res.json("success")
        }
    } catch(err) {
        console.log(err);
        res.json(err)
    }
});

// Send an OTP to user's email at registration

router.post("/sendRegisterOtp", async (req, res) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    try {
        const user = await User.findOne({email: req.body.email})
        const otp = await OTP.findOne({email: req.body.email})

        if (user) {
            res.json("Email already in use")
            return;
        }

        if (otp) {
            const temp = (Math.ceil(Math.random() * 1000000)).toString();
            const salt = await bcrypt.genSalt(10);
            const update = await bcrypt.hash(temp, salt);
            await otp.updateOne({otp: update});
            await otp.save();
            let mailOptions = {
                from: "clone.fakemazon@gmail.com",
                to: req.body.email,
                subject: "OTP for completing your registration fakemazon account",
                text: "Your OTP is " + temp + ". Valid for 5 mins"
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }

                else {
                    console.log("Done");
                }
            })
            res.json("success");
            return;
        }
        
        if (!user) {
            const temp = (Math.ceil(Math.random() * 1000000)).toString();

            let mailOptions = {
                from: "clone.fakemazon@gmail.com",
                to: req.body.email,
                subject: "OTP for completing your registration fakemazon account",
                text: "Your OTP is " + temp + ". Valid for 5 mins"
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }

                else {
                    console.log("Done");
                }
            })
            
            const otp = new OTP({
                email: req.body.email,
                otp: temp
            });

            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt);

            await otp.save()
            res.json("success")
        }
    } catch(err) {
        console.log(err);
        res.json(err)
    }
});


// send an OTP to user's mobile

router.post("/sendOtp", async (req, res) => {

    try {
        const user = await User.findOne({email: req.body.email})
        const otp = await OTP.findOne({email: req.body.email})

        if (otp) {
            const temp = (Math.ceil(Math.random() * 1000000)).toString();
            const salt = await bcrypt.genSalt(10);
            const update = await bcrypt.hash(temp, salt);
            await otp.updateOne({otp: update});
            await otp.save();
            var url = process.env.SPRING_URL1 + req.body.newPhone + process.env.SPRING_URL2 + temp + process.env.SPRING_URL3
            await axios.post(url).then(console.log("Done"))
            res.json("success")
            return;
        }

        else if (!user) {
            res.json("Email not registered. Create an account and try again");
        }
        
        else {
            const temp = (Math.ceil(Math.random() * 1000000)).toString();
            var url = process.env.SPRING_URL1 + req.body.newPhone + process.env.SPRING_URL2 + temp + process.env.SPRING_URL3
            await axios.post(url).then(console.log("Done"))
            
            const otp = new OTP({
                email: req.body.email,
                otp: temp
            })

            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt);

            await otp.save()
            res.json("success")
        }
    } catch(err) {
        res.json(err)
    }
})

module.exports = router