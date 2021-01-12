if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

console.log("Ambiente: " + process.env.NODE_ENV)

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

console.log("Conex BD: " + process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)