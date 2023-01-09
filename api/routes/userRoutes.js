const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/:id', auth.loggedUser, userController.getUser);
router.post('/register', userController.registration);
router.post('/login', userController.logging);
router.patch('/:id', auth.loggedUser, userController.updatedUser);

module.exports = router;
