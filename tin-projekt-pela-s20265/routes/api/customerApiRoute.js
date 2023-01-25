const express = require('express');
const router = express.Router();

const customerApiController = require('../../api/customerApi');
const rentalApiController = require('../../api/rentalApi');
const repairApiController = require('../../api/repairApi');
const isAuth = require('../../middleware/isAuth');
const isEmployee = require('../../middleware/isEmployee');
const ownOrAdmin = require('../../middleware/ownOrAdmin');
const ownOrEmployee = require('../../middleware/ownOrEmployee');

router.get('/', [isAuth, isEmployee], customerApiController.getCustomers);
router.get('/:userId', [isAuth, isEmployee], customerApiController.getCustomerById);
router.get('/:userId/rentals', [isAuth, ownOrEmployee], rentalApiController.getRentalsByCustomer);
router.get('/:userId/repairs', [isAuth, ownOrAdmin], repairApiController.getRepairsByEmployee);
router.get(
    '/:userId/rentals/:rentalId',
    [isAuth, ownOrEmployee],
    rentalApiController.getCustomerRentalById
);
router.get(
    '/:userId/repairs/:repairId',
    [isAuth, ownOrAdmin],
    repairApiController.getEmployeeRepairById
);

router.post('/', [isAuth, isEmployee], customerApiController.createCustomer);

router.put('/:userId', [isAuth, isEmployee], customerApiController.updateCustomer);

router.delete('/:userId', [isAuth, isEmployee], customerApiController.deleteCustomer);

module.exports = router;
