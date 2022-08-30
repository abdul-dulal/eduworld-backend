const express = require("express");
const mongoose = require("mongoose");
const handleProduct = require("./routes/Product");
const handleBlog = require("./routes/Blogs");
const handleUser = require("./routes/handleUser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json());
let cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.MONGOSE_URL)
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/product", handleProduct);
app.use("/blog", handleBlog);

app.use("/user", handleUser);
app.get("/", (req, res) => {
  res.send("hello from wirehouse");
});

const errorHandeler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    error: err,
  });
};

app.use(errorHandeler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
