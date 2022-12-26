const express = require('express');
const router = express.Router();

const customerApiController = require('../../api/customerApi');

router.get('/', customerApiController.getCustomers);
router.get('/:customerId', customerApiController.getCustomerById);
router.post('/', customerApiController.createCustomer);
router.put('/:customerId', customerApiController.updateCustomer);
router.delete('/:customerId', customerApiController.deleteCustomer);

module.exports = router;
