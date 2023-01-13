const router = require('express').Router()
const pizzaController = require('../controllers/pizzaController')

router.get('/', pizzaController.getAllPizzas);
//router.get('/:id', pizzaController.getPizza);
router.post('/', pizzaController.createPizza);
//router.put('/:id', pizzaController.updatePizza);
//router.delete('/:id', pizzaController.deletePizza);

module.exports = router
