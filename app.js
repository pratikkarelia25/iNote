const express = require('express')
const app = express();
const ejs = require('ejs')
const ejsMate = require('ejs-mate')

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('home');
})

app.listen(3000,(req,res)=>{
    console.log("Listening to port 3000")
})