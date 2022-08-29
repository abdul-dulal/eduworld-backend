const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require("../schemas/userSchem");
const User = mongoose.model("User", userSchema);

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hasedPassword,
    });
    await newUser.save();
    res.send("success");
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = router;
