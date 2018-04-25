const app = require('express')()
const bodyParser = require('body-parser')
const moods = require('./routes/mood.js')
// const teacher = require('./routes/teacher.js')
// const subject = require('./routes/subject.js')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.locals.unassigned= require('./helpers/unassigned.js')

app.set('view engine', 'ejs')

app.get('/', function(req, res, next) {
  res.render('home')
})

app.use('/moods', moods)

// app.use('/student', student)
// app.use('/teacher', teacher)
// app.use('/subject', subject)

app.listen(3000, (connect) => {
  console.log('===connected===');
})
