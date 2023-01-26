const express = require('express');
const router = express.Router();

const customerApiController = require('../../api/customerApi');
const rentalApiController = require('../../api/rentalApi');
const repairApiController = require('../../api/repairApi');
const isAuth = require('../../middleware/isAuth');
const isEmployee = require('../../middleware/isEmployee');
const isAdmin = require('../../middleware/isAdmin');
const ownOrAdmin = require('../../middleware/ownOrAdmin');
const ownOrEmployee = require('../../middleware/ownOrEmployee');
const ownRepair = require('../../middleware/ownRepair');
const roleIsCustomer = require('../../middleware/roleIsCustomer');

router.get('/', [isAuth, isEmployee], customerApiController.getCustomers);
router.get('/roles', [isAuth, isAdmin], customerApiController.getCustomersRoles);
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

router.post('/', [isAuth, isEmployee, roleIsCustomer], customerApiController.createCustomer);
router.post('/:userId/repairs/:repairId', [isAuth, ownRepair], repairApiController.createRepair);

router.put('/:userId', [isAuth, isEmployee, roleIsCustomer], customerApiController.updateCustomer);
router.put('/:userId/repairs/:repairId', [isAuth, ownRepair], repairApiController.updateRepair);

router.delete('/:userId', [isAuth, isAdmin], customerApiController.deleteCustomer);

module.exports = router;
