const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/').get(userController.getUser).post(userController.createUser);

// router.route('/:id').put(userController.updateUser);
module.exports = router;
