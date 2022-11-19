const express = require('express');
const router = express.Router();

const sprzetApiController = require('../../api/SprzetApi');

router.get('/', sprzetApiController.getSprzets);
router.get('/:sprzetId', sprzetApiController.getSprzetById);
router.post('/', sprzetApiController.createSprzet);
router.put('/:sprzetId', sprzetApiController.updateSprzet);
router.delete('/:sprzetId', sprzetApiController.deleteSprzet);

module.exports = router;