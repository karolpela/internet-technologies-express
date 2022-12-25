var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var langController = require('../controllers/langController');

router.get('/', function (req, res, next) {
    res.render('index', { navLocation: 'main' });
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/changeLang/:lang', langController.changeLang);

module.exports = router;
