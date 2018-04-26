const app = require('express')()
const bodyParser = require('body-parser')
const songs = require('./routes/songs.js')
const moods = require('./routes/mood.js')
const users = require('./routes/users.js')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.locals.getAge = require('./helpers/getAge.js')
app.locals.getDate = require('./helpers/getDate.js')
app.locals.checkSongList = require('./helpers/checkSongList')

app.use('/', users)
app.use('/songs', songs)
app.use('/moods', moods)

app.listen(3000, (connect) => {
  console.log('===connected===');
})
