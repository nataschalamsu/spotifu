const routes = require('express').Router()
const { Mood } = require('../models')

routes.get('/',(req,res) => {

    Mood.findAll()
    .then((moods) => {
        res.render('./moods/index', { moods })
    })
    .catch(err => {
        console.log(err);

    })
})

//Add Mood
routes.get('/add', (req,res) => {
    res.render('./moods/addMood')
})

routes.post('/add', (req,res) => {
    Mood.create({
        mood: req.body.mood,
        SongId: req.body.SongId
    })
    .then(newMood => {
        res.redirect('./')
    })
})

//Update Mood

routes.get('/edit/:id', (req,res) => {
    Mood.findById(req.params.id)
    .then(editedStudent => {
        res.render('/moods/editMood')
    })
})

routes.post('/edit/:id', (req,res) => {
    Mood.update({
        mood: req.body.mood,
        SongId: req.body.SongId
    },{
        where : { id: req.params.id }
    })
    .then(editedMood => {
        res.redirect('./')
    })
    .catch(err => {
        console.log(err);
    })
})
// routes.get()

module.exports = routes
