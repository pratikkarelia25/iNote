const express = require('express');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const Note = require('./models/notes');
const methodOveride = require('method-override');

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

app.get('/',(req,res)=>{
    res.render('home');
})
app.post('/',async (req,res)=>{
    const note = new Note(req.body.notes);
    await note.save();
    res.redirect('/notes');
})

app.get('/notes',async(req,res)=>{
    const notes = await Note.find({});
    res.render('notes/index',{notes});
})

app.get('/notes/new',(req,res)=>{
    res.render('notes/new');
})


app.get('/notes/:id',async(req,res)=>{
    const {id} = req.params;
    const note = await Note.findById(id);
    res.render('notes/show',{note})
})

app.get('/notes/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const note = await Note.findById(id);
    res.render('notes/edit',{note})
})

app.put('/notes/:id',async(req,res)=>{
    const {id} = req.params;
    const note = await Note.findByIdAndUpdate(id,{...req.body.notes});
    await note.save();
    res.redirect(`/notes/${id}`);
})

app.delete('/notes/:id',async(req,res)=>{
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    res.redirect('/notes');
})

app.listen(3000,(req,res)=>{
    console.log("Listening to port 3000")
})