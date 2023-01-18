const express = require('express');
const router = express.Router();

const equipmentApiController = require('../../api/EquipmentApi');
const isAuth = require('../../middleware/isAuth');
const isEmployee = require('../../middleware/isEmployee');

router.get('/', equipmentApiController.getEquipment);
router.get('/:equipmentId', isAuth, equipmentApiController.getEquipmentById);

router.post('/', [isAuth, isEmployee], equipmentApiController.createEquipment);

router.put('/:equipmentId', [isAuth, isEmployee], equipmentApiController.updateEquipment);

router.delete('/:equipmentId', [isAuth, isEmployee], equipmentApiController.deleteEquipment);

module.exports = router;
