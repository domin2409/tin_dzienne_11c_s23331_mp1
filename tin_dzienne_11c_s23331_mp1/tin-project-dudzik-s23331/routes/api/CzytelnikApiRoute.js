const express = require('express');
const router = express.Router();

const czytelnikApiController = require('../../api/czytelnikAPI')

router.get('/', czytelnikApiController.getCzytelnicy);
router.get('/:id_czytelnik', czytelnikApiController.getCzytelnikById);
router.post('/', czytelnikApiController.createCzytelnik);
router.put('/:id_czytelnik', czytelnikApiController.updateCzytelnik);
router.delete('/:id_czytelnik', czytelnikApiController.deleteCzytelnik);

module.exports = router;