const app = require('express')()
const bodyParser = require('body-parser')
const songs = require('./routes/songs.js')
const moods = require('./routes/mood.js')
const users = require('./routes/users.js')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.locals.unassigned= require('./helpers/unassigned.js')

app.set('view engine', 'ejs')

//helper
app.locals.checkSongList = require('./helpers/checkSongList')


// app.get('/', function(req, res, next) {
//   res.render('login')
// })

// app.get('/register', function(req, res, next) {
//   res.render('register')
// })

app.use('/', users)
app.use('/songs', songs)
app.use('/moods', moods)

app.listen(3000, (connect) => {
  console.log('===connected===');
})
