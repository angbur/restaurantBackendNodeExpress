const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pizzaRouter = require('./api/routes/pizzaRoutes');
const userRouter = require('./api/routes/userRoutes');
const orderRouter = require('./api/routes/orderRoutes');

const cors = require('cors');

app.use((req, res, next) => {
  const error = new Error('This URL does not exist')
  next()
});
const corsOptions = {
  exposedHeaders: ["Accept","Accept-Language","Content-Language", "X-Requested-With", "Authorization", "Content-Type"],
  allowedHeaders: ["*","Accept","Accept-Language","Content-Language", "X-Requested-With", "Authorization", "Content-Type"],
  origin: '*'
};
app.use('/',cors(corsOptions));

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

app.use('/pizza', pizzaRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);

module.exports = app
