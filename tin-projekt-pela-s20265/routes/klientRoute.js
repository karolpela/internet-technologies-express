const express = require('express');
const router = express.Router();

const klientController = require('../controllers/klientController');

router.get('/', klientController.showKlientList);
router.get('/add', klientController.showAddKlientForm);
router.get('/details/:klientId', klientController.showKlientDetails)
router.get('/edit/:klientId', klientController.showEditKlientForm)

module.exports = router;