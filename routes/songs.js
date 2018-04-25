const routes = require('express').Router()
const {Song, Mood, UserSong, User} = require('../models')

routes.get('/', (req, res) => {
  Song
    .findAll()
    .then((songs) => {
      res.render('songs', {songData: songs})
    })
})

routes.get('/add', (req, res) => {
  res.render('form_song')
})

routes.post('/add', (req, res) => {
  Song.create({
    title_song:req.body.title,
    singer: req.body.singer,
    genre: req.body.genre,
    song_link: req.body.link
  })
  .then((newSong) => {
    res.redirect('add')
  })
  .catch((err) => {
    res.render('form_song', err)
  })
})

routes.get('/edit/:id', (req, res) => {
  res.render('edit_song')
})

routes.post('/edit/:id', (req, res) => {
  Song.findById({
    where: {
      id: req.params.id
    }
  })
  .then(song => {
    song.update({
      title_song:req.body.title,
      singer: req.body.singer,
      genre: req.body.genre,
      song_link: req.body.link
    })
    .then(updated => {
      res.redirect('/')
    })
    .catch((err) => {
      res.render('edit_song', {err})
    })
  })
  .catch((err) => {
    res.render('edit_song', {err})
  })
})

routes.get('/delete/:id', (req, res) => {
  Song.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    res.redirect('/')
  })
  .catch((err) => {
    res.render('/', {err})
  })
})

module.exports = routes
