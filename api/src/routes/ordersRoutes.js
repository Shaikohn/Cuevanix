const { Router } = require('express');
const { addOrder } = require('../controllers/ordersControllers.js');
const router = Router();

router.post('/', addOrder);

module.exports = router;