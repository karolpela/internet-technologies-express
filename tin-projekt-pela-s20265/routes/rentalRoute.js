const express = require('express');
const router = express.Router();

const rentalController = require('../controllers/rentalController');

router.get('/', rentalController.showRentalList);
router.get('/add', rentalController.showAddRentalForm);
router.get('/details/:rentalId', rentalController.showRentalDetails);
router.get('/edit/:rentalId', rentalController.showEditRentalForm);
router.post('/add', rentalController.addRental);
router.post('/edit', rentalController.updateRental);
router.get('/delete/:rentalId', rentalController.deleteRental);

module.exports = router;
