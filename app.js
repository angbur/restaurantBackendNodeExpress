const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const pizzaRouter = require('./api/routes/pizzaRoutes')

app.use((req, res, next) => {
  const error = new Error('This URL does not exist')
  next()
})

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Connection failed', error)
  })

app.use(express.json())

app.use('/pizza', pizzaRouter)

module.exports = app
