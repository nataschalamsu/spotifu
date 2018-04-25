const app = require('express')()
const bodyParser = require('body-parser')
const songs = require('./routes/songs.js')
// const teacher = require('./routes/teacher.js')
// const subject = require('./routes/subject.js')

app.use(bodyParser.urlencoded({extended:false}))

// app.locals.unassigned= require('./helpers/unassigned.js')

app.set('view engine', 'ejs')

app.get('/', function(req, res, next) {
  res.render('home')
})

app.get('/register', function(req, res, next) {
  res.render('register')
})

app.use('/songs', songs)
// app.use('/teacher', teacher)
// app.use('/subject', subject)

app.listen(3000, (connect) => {
  console.log('===connected===');
})
