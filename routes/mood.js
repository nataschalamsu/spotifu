const routes = require('express').Router()
const { Mood, Song } = require('../models')

routes.get('/',(req,res) => {
    Mood.findAll({
      include: [{
        model: Song
      }]
    })
    .then((moods) => {
        res.render('./moods/index', { moods })
    })
    .catch(err => {
        res.send(err);
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
        res.redirect('/moods/add')
    })
})

//Update Mood

routes.get('/edit/:id', (req,res) => {
    Mood.findById(req.params.id)
    .then((mood) => {
      Song.findAll()
      .then(songs => {
        res.render('editMood', { mood, songs })
      })
      .catch(err => {
        res.send(err)
      })
    })
    .catch(err => {
      res.send(err)
    })
})

routes.post('/edit/:id',(req,res) => {
    
    Mood.update({
        mood: req.body.moodName,
        SongId: req.body.SongId
    },{
        where : { id: req.params.id }
    })
    .then((edited) => {
        res.redirect('/moods')
    })
    .catch((err) => {
        res.send(err);
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
