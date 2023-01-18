const express = require('express');
const router = express.Router();

const customerApiController = require('../../api/customerApi');
const rentalApiController = require('../../api/rentalApi');
const isAuth = require('../../middleware/isAuth');
const isEmployee = require('../../middleware/isEmployee');
const isGettingOwnResources = require('../../middleware/isGettingOwnResources');

router.get('/', [isAuth, isEmployee], customerApiController.getCustomers);
router.get('/:customerId', [isAuth, isEmployee], customerApiController.getCustomerById);
router.get(
    '/:customerId/rentals',
    [isAuth, isGettingOwnResources],
    rentalApiController.getRentalsByCustomer
);
router.get(
    '/:customerId/rentals/:rentalId',
    [isAuth, isGettingOwnResources],
    rentalApiController.getCustomerRentalById
);

router.post('/', [isAuth, isEmployee], customerApiController.createCustomer);

router.put('/:customerId', [isAuth, isEmployee], customerApiController.updateCustomer);

router.delete('/:customerId', [isAuth, isEmployee], customerApiController.deleteCustomer);

module.exports = router;
