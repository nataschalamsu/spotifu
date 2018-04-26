const routes = require('express').Router()
const {User, UserSong, Song} = require('../models')
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
  let id = req.session.user.id
  User.findById(id)
  .then(userLogin => {
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
   Song.findAll()
   .then(songs => {
     res.render('add_song', {userNow: user, dataSong: songs})
   })
 })
})

routes.post('/addSong/:id', checkLogin, (req, res) => {
  UserSong.create({
    UserId: req.params.id,
    SongId: req.body.id
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
