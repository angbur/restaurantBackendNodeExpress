const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }],
  categories: [{
    type: String,
    required: true,
  }]
})

module.exports = mongoose.models.Pizza || mongoose.model('Pizza', pizzaSchema)
