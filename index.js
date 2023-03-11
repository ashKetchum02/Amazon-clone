require('dotenv').config()
const port = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

try {
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
    console.log("Mongo connected");
  });
} catch(err) {
  console.log(err);
}

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/payment", require("./routes/payment"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/conversations", require("./routes/conversations"));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

app.listen(port, function() {
    console.log("Server Running on port 8000");
})