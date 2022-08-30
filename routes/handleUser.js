const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchem");
const User = mongoose.model("User", userSchema);

// signup

router.post("/signup", async (req, res) => {
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

// login

router.post("/login", async (req, res) => {
  const user = await User.find({ email: req.body.email });

  try {
    if (user) {
      const isVaildPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isVaildPassword) {
        const token = jwt.sign(
          {
            email: user[0]?.email,
            userId: user[0]?._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({
          token,
          message: "login Scuccess",
        });
      } else {
        res.json({
          error: "fail",
        });
      }
    } else {
      res.json({
        error: "fail2",
      });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
