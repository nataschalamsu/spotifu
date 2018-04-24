const routes = require('express').Router()
const {Song} = require('./models')

routes.get('/', (req, res) => {
  Song.findAll()
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
    song_link: req.body.link,
    MoodId: req.body.MoodId
  })
  .then((newSong) => {
    res.redirect('/')
  })
  .catch((err) => {
    res.render('form_song', err)
  })
})

module.exports = routes
