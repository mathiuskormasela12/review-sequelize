// ===== Server
// import all modules
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')

// setup dotenv
dotenv.config({ path: './.env' })

// destructuring environtment variables
const {
  PORT = 3000,
  APP_URL
} = process.env

// init app
const app = express()

// setup urlencoded & json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// setup static file
app.use(express.static(path.join(__dirname, './uploads')))

// setup several middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// define client
const whiteList = []

// define cors option
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Blocked By Cors'))
    }
  }
}

// use cors options
app.use(cors(corsOptions))

app.use('/api/auth', require('./src/routes/auth'))

app.listen(PORT, () => {
  console.log('Web Service running at', APP_URL)
})
