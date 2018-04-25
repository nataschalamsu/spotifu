const routes = require('express').Router()
const {User, UserSong, Song} = require('../models')

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
})

module.exports = routes
