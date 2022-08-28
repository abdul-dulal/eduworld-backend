const express = require("express");
const mongoose = require("mongoose");
const handleProduct = require("./routes/Product");
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

app.get("/", (req, res) => {
  res.send("hello from wirehouse");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
