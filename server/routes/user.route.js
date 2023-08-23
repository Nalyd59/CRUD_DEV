const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/all', userController.getAllUsers)
router.post('/register', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;