const express = require('express');
const router = express.Router();
const Note = require('../models/notes')

router.get('/',async(req,res)=>{
    const notes = await Note.find({});
    res.render('notes/index',{notes});
})

router.post('/',async (req,res)=>{
    const note = new Note(req.body.notes);
    await note.save();
    res.redirect('/notes');
})

router.get('/new',(req,res)=>{
    res.render('notes/new');
})

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const note = await Note.findById(id);
    res.render('notes/show',{note})
})

router.get('/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const note = await Note.findById(id);
    res.render('notes/edit',{note})
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const note = await Note.findByIdAndUpdate(id,{...req.body.notes});
    await note.save();
    res.redirect(`/notes/${id}`);
})

router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    res.redirect('/notes');
})


module.exports = router;