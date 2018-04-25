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
        res.redirect('/moods')
    })
})

//Update Mood

routes.get('/edit/:id', (req,res) => {
    Mood.findById(req.params.id)
    .then((mood) => {
        res.render('./moods/editMood', { mood })
    })
})

routes.post('/edit/:id',(req,res) => {
    // Mood.findById(req.params.id)
    // .then(found => {
    //     found.update({
    //         mood: req.body.moodName,
    //         SongId: req.body.SongId
    //     })
    //     .then(updated => {
    //         // res.send(updated)
    //     })
    // })
    Mood.update({
        mood: req.body.moodName,
        SongId: req.body.SongId
    },{
        where : { id: req.params.id }
        where: {id:req.params.id}
    })
    .then((edited) => {
        res.redirect('/moods')
    })
    .catch((err) => {
        console.log(err);

    })
})


//delete mood

routes.get('/delete/:id', (req,res) => {
    Mood.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((deleted) => {
        res.redirect('/moods')
    })
    .catch(err => {
        console.log(err);

    })
})

module.exports = routes
