const express = require('express');
const router = express.Router();

const repairApiController = require('../../api/RepairApi');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');
const isEmployee = require('../../middleware/isEmployee');
const ownOrAdmin = require('../../middleware/ownOrAdmin');

router.get('/', [isAuth, isAdmin], repairApiController.getRepairs);
router.get('/employee/:userId', [isAuth, ownOrAdmin], repairApiController.getRepairsByEmployee);
router.get('/statuses', [isAuth, isEmployee], repairApiController.getRepairStatuses);

router.get('/:repairId', [isAuth, isAdmin], repairApiController.getRepairById);
router.get(
    '/employee/:userId/repairs/:repairId',
    [isAuth, ownOrAdmin],
    repairApiController.getRepairById
);

router.post('/', [isAuth, isAdmin], repairApiController.createRepair);

router.put('/:repairId', [isAuth, isAdmin], repairApiController.updateRepair);

router.delete('/:repairId', [isAuth, isAdmin], repairApiController.deleteRepair);

module.exports = router;
