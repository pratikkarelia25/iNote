const express = require('express');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const Note = require('./models/notes');
const methodOveride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/users');
const notesRoute = require('./routes/notes');

mongoose.connect('mongodb://localhost:27017/iNote');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set('views',path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride('_method'));

const sessionConfig = {
    secret: 'helo',
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 1000*60*60*24*2,
        maxAge: 1000*60*60*24*2
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/notes', notesRoute)

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/register',(req,res)=>{
    res.render('auth/register')
})

app.post('/register',async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user,password);
        res.redirect('/notes')
    }
    catch(e){
        res.send(e.message);
    }

})

app.listen(3000,(req,res)=>{
    console.log("Listening to port 3000")
})