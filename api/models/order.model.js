const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pizza',
      numberOfSlices: Number,
    },
  ],
  orderValue: {
    type: Number,
    require: true,
  },
})

module.exports = mongoose.models.Pizza || mongoose.model('Pizza', pizzaSchema)
