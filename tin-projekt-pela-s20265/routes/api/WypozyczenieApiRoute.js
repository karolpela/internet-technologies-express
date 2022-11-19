const express = require('express');
const router = express.Router();

const wypozyczenieApiController = require('../../api/WypozyczenieApi');

router.get('/', wypozyczenieApiController.getWypozyczenia);
router.get('/:wypozyczenieId', wypozyczenieApiController.getWypozyczenieById);
router.post('/', wypozyczenieApiController.createWypozyczenie);
router.put('/:wypozyczenieId', wypozyczenieApiController.updateWypozyczenie);
router.delete('/:wypozyczenieId', wypozyczenieApiController.deleteWypozyczenie);

module.exports = router;