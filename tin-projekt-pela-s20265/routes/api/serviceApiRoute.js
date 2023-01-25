const express = require('express');
const router = express.Router();

const serviceApiController = require('../../api/ServiceApi');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');
const isEmployee = require('../../middleware/isEmployee');
const ownOrEmployee = require('../../middleware/ownOrEmployee');

router.get('/', isAuth, serviceApiController.getServices);
router.get('/types', [isAuth, isEmployee], serviceApiController.getServiceTypes);
router.get('/:serviceId', [isAuth, ownOrEmployee], serviceApiController.getServiceById);
router.post('/', [isAuth, isAdmin], serviceApiController.createService);
router.put('/:serviceId', [isAuth, isAdmin], serviceApiController.updateService);
router.delete('/:serviceId', [isAuth, isAdmin], serviceApiController.deleteService);

module.exports = router;
