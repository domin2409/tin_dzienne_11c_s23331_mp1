const express = require('express');
const router = express.Router();

const czytelnikApiController = require('../../api/czytelnikAPI')
const isAuth = require('../../tin-react-app/middleware/isAuth');

router.get('/', czytelnikApiController.getCzytelnicy);
router.get('/:id_czytelnik', czytelnikApiController.getCzytelnikById);
router.post('/', czytelnikApiController.createCzytelnik);
router.put('/:id_czytelnik', czytelnikApiController.updateCzytelnik);
router.delete('/:id_czytelnik', isAuth, czytelnikApiController.deleteCzytelnik);

module.exports = router;