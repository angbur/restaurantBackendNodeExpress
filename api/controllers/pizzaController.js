const PizzaModel = require('../models/pizza.model')

exports.getAllPizzas = async (req, res) => {
  let pizzaList
  try {
    pizzaList = await PizzaModel.find().sort({ price: 'desc' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
  return res.send({ pizzaList: pizzaList })
}

exports.createPizza = async (req, res) => {
  try {
    const pizzaCreate = new PizzaModel({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
      categories: req.body.categories,
    })
    const newPizza = await pizzaCreate.save()
    res.status(201).json(newPizza)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
