const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

const router = express();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    console.log(user);
    const token = jwt.sign({userId: user._id},"MY_SECRET_KEY");
    res.send({token});
  } catch (error) {
      return res.status(400).send(error.message);  
  }
});

module.exports = router;
