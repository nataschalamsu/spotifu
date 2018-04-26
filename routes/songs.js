const routes = require('express').Router()
const {Song, Mood, UserSong, User} = require('../models')
const { Sequelize } = require('../models')
const Op = Sequelize.Op
const checkLogin = require('../middlewares/checkLogin.js')
const checkUser = require('../middlewares/checkUser.js')

routes.get('/', checkUser, (req, res) => {
  Song
    .findAll({
      include: [{
        model: Mood
      }]
    })
    .then((songs) => {
      res.render('songs', {songData: songs})
    })
})

routes.get('/add', checkUser,(req, res) => {
  res.render('form_song')
})

routes.post('/add', checkUser,(req, res) => {
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

//searchSong

routes.get('/search', checkLogin, (req,res) => {
  // Mood.getMood(req.query.search)
  // .then(songsByMood => {
  let song = new Song()
      Mood.findAll({
        include: [{model: Song}],
        where: {
          mood: {
            [Op.iLike] : `%${req.query.search}%`
          }
        }
      })
      .then(songsByMood => {
          song.getSongsByTitle(`${req.query.search}`)
            .then(songsByTitle => {
              Song.getSongsBySinger(`${req.query.search}`)
              .then(songsBySinger => {
                Song.getSongsByGenre(`${req.query.search}`)
                .then(songsByGenre => {
                  res.render( 'searchSong', { songsByMood,songsByTitle, songsBySinger, songsByGenre} )
                })
                .catch()
              })
              .catch()
            })
            .catch()
            })
        // res.send(moods)
      })
// })


module.exports = routes
