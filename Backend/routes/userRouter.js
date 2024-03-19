const express = require('express')
const authController = require('../controllers/authController');
const router = express.Router();
const userController = require('../controllers/userController')


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/')
    .get(userController.getAllUsers)
    .patch(userController.createUser)
module.exports = router;