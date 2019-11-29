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

router.post('/signin', async (req,res)=>{
const {email,password} = req.body;
if(!email || !password){
    return res.status(422).send({error: "Must Provide email and password"})
}

const user = await User.findOne({email});
if (!user){
    return res.status(404).send({error: "Invalid password or email"})
}
try{
    await user.comparePassword(password);
    const token = jwt.sign({userId: user.id},"MY_SECRET_KEY")
    res.send({token});
}
catch (err){
    return res.status(404).send({error: "Invalid password or email"})
}

})

module.exports = router;
