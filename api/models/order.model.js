const { number } = require('joi')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  order: [{
    item: {
      pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
      },
      name: {
        type: String,
      },
      ingredients: [{
        type: String,
      }],
    },
    quantity: {
      type: Number,
      required: true,
    }
  }],
  deliveryAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      houseNumber: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  }
})

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
