const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.showCustomerList);
router.get('/add', customerController.showAddCustomerForm);
router.get('/details/:customerId', customerController.showCustomerDetails);
router.get('/edit/:customerId', customerController.showEditCustomerForm);
router.post('/add', customerController.addCustomer);
router.post('/edit', customerController.updateCustomer);
router.get('/delete/:customerId', customerController.deleteCustomer);

module.exports = router;
