const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');

router.get('/', equipmentController.showEquipmentList);
router.get('/add', equipmentController.showAddEquipmentForm);
router.get('/details/:equipmentId', equipmentController.showEquipmentDetails)
router.get('/edit/:equipmentId', equipmentController.showEditEquipmentForm)

module.exports = router;