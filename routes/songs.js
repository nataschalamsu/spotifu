const routes = require('express').Router()
const {Song, Mood, UserSong, User} = require('../models')
const { Sequelize } = require('../models')
const op = Sequelize.Op

routes.get('/', (req, res) => {
  Song
    .findAll({
      include: [{
        model: Mood
      }]
    })
    .then((songs) => {
      // console.log(songs[0].Moods.mood);
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

//searchSong

routes.get('/search', (req,res) => {
  // Song.findAll({where: {singer: "adsad" OR genre: "asdasd" OR}})
  Song.getSongsByTitle(req.query.search)
    .then(songsByTitle => {
      Song.getSongsBySinger(req.query.search)
      .then(songsBySinger => {
        Song.getSongsByGenre(req.query.search)
        .then(songsByGenre => {
          res.render('searchSong', { songsByTitle, songsBySinger, songsByGenre })
        })
        .catch()
      })
      .catch()
    })
    .catch()

//   Song.getSongsByTitle(req.query.search)
//   .then(songsByTitle => {
//     Song.getSongsBySinger(req.query.search)

//   })
// })

// routes.get('/search', (req,res) => {

//   Song.findAll({
//     where : {
//       title_song: {
//         [op.like]: `%${req.query.search}%`
//       }
//     }
//   })
//   .then((songsByTitle) => {
//     Song.findAll({
//       where : {
//         singer: {
//           [op.like]: `%${req.query.search}%`
//         }
//       }
//     })
//     .then((songsBySinger) => {
//       Song.findAll({
//         where: {
//           genre: {
//             [op.like]: `%${req.query.search}%`
//           }
//         }
//       })
//       .then((songsByGenre) => {
        
//         res.render('searchSong', { songsByTitle, songsBySinger, songsByGenre })
//       })
//     })
//   })
//   .catch(err => {
//     res.render('searchSong', { err })
//   })
})

module.exports = routes
