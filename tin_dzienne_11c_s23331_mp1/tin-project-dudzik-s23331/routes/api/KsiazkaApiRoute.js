const express = require('express');
const router = express.Router();

const ksiazkaApiController = require('../../api/ksiazkaAPI')

router.get('/', ksiazkaApiController.getKsiazka);
router.get('/:id_ksiazka', ksiazkaApiController.getKsiazkaById);
router.post('/', ksiazkaApiController.createKsiazka);
router.put('/:id_ksiazka', ksiazkaApiController.updateKsiazka);
router.delete('/:id_ksiazka', ksiazkaApiController.deleteKsiazka);

module.exports = router;