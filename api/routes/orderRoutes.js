const router = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth.loggedUser, orderController.createOrder);
//router.get('/:id', orderController.getOrder);
//router.delete('/:id', orderController.deleteOrder);
router.get('/user/:id', auth.loggedUser, orderController.getAllOrdersByUserId);

module.exports = router;
