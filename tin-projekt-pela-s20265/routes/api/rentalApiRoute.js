const express = require('express');
const router = express.Router();

const rentalApiController = require('../../api/RentalApi');
const repairApiController = require('../../api/RepairApi');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');
const isEmployee = require('../../middleware/isEmployee');
const ownOrEmployee = require('../../middleware/ownOrEmployee');
const ownOrAdmin = require('../../middleware/ownOrAdmin');

router.get('/', isAuth, rentalApiController.getRentals);
router.get('/customer/:userId', [isAuth, ownOrEmployee], rentalApiController.getRentalsByCustomer);

router.get('/:rentalId', [isAuth, ownOrEmployee], rentalApiController.getRentalById);
router.post('/', [isAuth, isEmployee], rentalApiController.createRental);
router.put('/:rentalId', [isAuth, isEmployee], rentalApiController.updateRental);
router.delete('/:rentalId', [isAuth, isEmployee], rentalApiController.deleteRental);

module.exports = router;
