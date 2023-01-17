const express = require('express');
const router = express.Router();

const rentalApiController = require('../../api/RentalApi');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');
const isEmployee = require('../../middleware/isEmployee');
const isGettingOwnResources = require('../../middleware/isGettingOwnResources');

router.get('/', isAuth, rentalApiController.getRentals);
router.get(
    '/customer/:customerId',
    [isAuth, isGettingOwnResources],
    rentalApiController.getRentalsByCustomer
);
router.get('/:rentalId', [isAuth, isGettingOwnResources], rentalApiController.getRentalById);
router.post('/', isEmployee, rentalApiController.createRental);
router.put('/:rentalId', isEmployee, rentalApiController.updateRental);
router.delete('/:rentalId', isEmployee, rentalApiController.deleteRental);

module.exports = router;
