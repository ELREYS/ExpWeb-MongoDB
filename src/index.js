//Mongo DB and Express API
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const mongoUri = 'mongodb+srv://admin:admin@cluster0-zcwbt.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
})

mongoose.connection.on('connected',() => {
    console.log("Connected to mongo instances");
    
});

mongoose.connection.on('error',(err) =>{
    console.log("Error connecting to mongo",err);
    
})


app.get('/',(req,res) =>{
    res.send("Hi There");
});

app.listen(3000,() => {
    console.log("Listening on port 3000");
    
})
