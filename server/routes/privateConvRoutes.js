const express = require('express');

const privateConvController = require('../controllers/privateConvController');
const router = express.Router();

router
  .route('/')
  .get(privateConvController.getAllMessages)
  .post(privateConvController.createMessage)
  .patch(privateConvController.updatePerson);

router
  .route('/:id')
  .get(privateConvController.getMessage)
  .patch(privateConvController.updateMesssages)
  .delete(privateConvController.deleteChat);

module.exports = router;
