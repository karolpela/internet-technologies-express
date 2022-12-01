const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');

router.get('/', equipmentController.showEquipmentList);
router.get('/add', equipmentController.showAddEquipmentForm);
router.get('/details/:equipmentId', equipmentController.showEquipmentDetails);
router.get('/edit/:equipmentId', equipmentController.showEditEquipmentForm);
router.post('/add', equipmentController.addEquipment);
router.post('/edit', equipmentController.updateEquipment);
router.get('/delete/:equipmentId', equipmentController.deleteEquipment);

module.exports = router;
