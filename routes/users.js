const routes = require('express').Router()
const {User, UserSong, Song, Mood} = require('../models')
const session = require('express-session')
const bcrypt = require('bcrypt')
const checkLogin = require('../middlewares/checkLogin.js')
const checkUser = require('../middlewares/checkUser.js')

routes.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

routes.get('/register', checkUser, (req, res) => {
  res.render('register')
})

routes.post('/register', (req, res) => {
  User.create({
    name: req.body.name,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    email: req.body.email,
    password: req.body.password
  })
  .then(newUser => {
    res.redirect('/')
  })
  .catch((err) => {
    res.render('register', {err})
  })
})

routes.get('/', (req, res) => {
  res.render('login')
})

routes.post('/', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(userLogin => {
    if(bcrypt.compareSync(req.body.password, userLogin.password)) {
      req.session.user = userLogin
      res.redirect('/profile')
    } else {
      res.redirect('/login')
    }
  })
})

routes.get('/profile', checkLogin, (req, res) => {
  let userId = req.session.user.id
  User.findOne({
    where: {
      id: userId
    },
    include: [{
      model: Song
    }]
  })
  .then(userLogin => {
    // console.log(userLogin.Songs)
    res.render('profile', {user: userLogin})
  })
  .catch(err => {
    res.send(err)
  })
})
// routes.use('/', checkLogin)

routes.get('/addSong/:id', checkLogin, (req, res) => {
 User.findById(req.params.id)
 .then(user => {
   Song.findAll({
     include: [{
       model: Mood
     }]
   })
   .then(songs => {
     res.render('add_song', {userNow: user, songData: songs})
   })
 })
})

routes.post('/addSong/:id', checkLogin, (req, res) => {
  UserSong.create({
    UserId: req.session.user.id,
    SongId: req.params.id
  })
  .then(added => {
    res.redirect('/profile')
  })
  .catch((err) => {
    res.send(err)
  })
})

routes.get('/logout', (req, res) => {
 if (req.session) {
   req.session.destroy(function(err) {
     if(err) {
       return next(err);
     } else {
       return res.redirect('/');
     }
   });
 }
})

module.exports = routes
