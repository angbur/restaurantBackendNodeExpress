const OrderModel = require('../models/order.model');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
      const orderCreate = new OrderModel({
        user: req.body.user,
        order: req.body.order,
        total: req.body.total,
        deliveryAddress: req.body.deliveryAddress,
        date: Date.now(),
      })
      const newOrder = await orderCreate.save()
      res.status(201).json({message: 'Success!'})
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  };
  
exports.getAllOrdersByUserId = async (req, res) => {
    try {
      const orderList = await OrderModel.find({user: req.params.id});
      if (!orderList)
        return res
          .status(404)
          .send({'message': 'This user has no order history'});
      res.status(200).send({'data': orderList});
    } catch (error) {
      res.status(404).send({ message: error.message});
    }
};