require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production' 
  ? 'tiny'
  : 'common')

  app.use(morgan(morganOption))
  app.use(helmet())
  app.use(cors())
  app.use(express.json())

  app.post('/', (req, res) => {
    console.log(req.body)
    res.send('POST request received.')
  })

  app.post('/user', (req, res) => {
    // get the data
    const { username, password, favoriteClub, newsLetter=false } = req.body

    // validation code here
    if(!username) {
      return res  
        .status(400)
        .send('Username required')
    }
    if(!password) {
      return res
        .status(400)
        .send('Password required')
    }
    if(!favoriteClub) {
      return res  
        .status(400)
        .send('favorite Club required')
    }
  })

  app.get('/', (req, res) => {
    res.send('A GET Request')
  })

  app.use(function errorHandler(error, req, res, next) {
    let response
    if(NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })

  module.exports = app
