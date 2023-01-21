const express = require('express');
const router = express.Router();

const wypozyczenieApiController = require('../../api/wypozyczenieAPI')

router.get('/', wypozyczenieApiController.getCzytelnicy);
router.get('/:id_wypozyczenie', wypozyczenieApiController.getWypozyczenieById);
router.post('/', wypozyczenieApiController.createWypozyczenie);
router.put('/:id_wypozyczenie', wypozyczenieApiController.updateWypozyczenie);
router.delete('/:id_wypozyczenie', wypozyczenieApiController.deleteWypozyczenie);

module.exports = router;