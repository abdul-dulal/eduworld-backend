const router = require("express").Router();
const mongoose = require("mongoose");
const schema = require("../schemas/ProductSchema");
const checkLogin = require("../middlewares/CheckLogin");
const Product = mongoose.model("Product", schema);

router.post("/post-product", async (req, res) => {
  const newProduct = Product(req.body);
  try {
    await newProduct.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(product);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/quantity/:id", async (req, res) => {
  try {
    const quantity = req.body;
    const updateQuantity = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          quantity: quantity.quantity,
        },
      }
    );
    res.send(updateQuantity);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/delete-item/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const deleteItem = await Product.findByIdAndDelete({ _id: id });
    res.send(deleteItem);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/get-myItems", checkLogin, async (req, res) => {
  const user = req.query.user;
  try {
    const getUser = await Product.find({ user });
    res.send(getUser);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
