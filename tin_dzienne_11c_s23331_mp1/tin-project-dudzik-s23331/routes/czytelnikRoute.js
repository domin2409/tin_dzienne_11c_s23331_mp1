const express = require('express');
const router = express.Router();

const czytelnikController = require('../controllers/czytelnikController');

router.get('/', czytelnikController.showCzytelnikList);
router.get('/add', czytelnikController.showAddCzytelnikForm);
router.get('/details/:czytelnikId', czytelnikController.showCzytelnikDetails);

module.exports = router;