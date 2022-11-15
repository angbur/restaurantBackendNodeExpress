const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/:id', userController.getUser)
router.post('/register', userController.registration)
router.post('/login', userController.logging)
router.patch('/:id', userController.updatedUser)

module.exports = router
