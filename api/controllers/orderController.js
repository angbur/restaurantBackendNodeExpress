const OrderModel = require('../models/order.model')

exports.createOrder = async (req, res) => {
    try {
      const orderCreate = new OrderModel({
        userId: req.body.userId,
        order: req.body.order,
        total: req.body.total,
        deliveryAddress: req.body.deliveryAddress,
        date: Date.now(),
      })
      const newOrder = await orderCreate.save()
      res.status(201).json({message: 'Success'})
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  };
  