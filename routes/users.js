const routes = require('express').Router()
const {User, UserSong, Song} = require('../models')
const session = require('express-session')
const bcrypt = require('bcrypt')
const checkLogin = require('../middlewares/checkLogin.js')

routes.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

routes.get('/register', (req, res) => {
  res.render('register')
})

routes.post('/register', (req, res) => {
  User.create({
    name: req.body.name,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    email: req.body.email,
    password: req.body.password,
  })
  .then(newUser => {
    res.redirect('login')
  })
  .catch((err) => {
    res.render('register', {err})
  })
})

routes.get('/login', (req, res) => {
  res.render('login')
})

routes.post('./login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(userLogin => {
    if(bcrypt.compareSync(req.body.password, userLogin.password)) {
      req.session.user = userLogin
      res.redirect('profile')
    } else {
      res.redirect('login')
    }
  })
})

routes.use('/', checkLogin)

module.exports = routes
