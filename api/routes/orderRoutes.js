const router = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

//router.get('/', orderController.getAllOrders);
router.post('/', auth.loggedUser, orderController.createOrder);
//router.get('/:id', orderController.getOrder);
//router.delete('/:id', orderController.deleteOrder);

module.exports = router;
