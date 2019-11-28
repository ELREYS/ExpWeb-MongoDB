//Mongo DB and Express API
require('./models/User');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const app = express();
const requireAuth = require('./middlewares/requireAuth');

app.use(bodyParser.json());
app.use(authRouter);

const mongoUri = 'mongodb+srv://admin:admin@cluster0-zcwbt.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

mongoose.connection.on('connected',() => {
    console.log("Connected to mongo instances");
    
});

mongoose.connection.on('error',(err) =>{
    console.log("Error connecting to mongo",err);
    
})




app.get('/',requireAuth,(req,res) =>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,() => {
    console.log("Listening on port 3000");
    
})
