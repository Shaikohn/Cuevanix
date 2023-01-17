const { Router } = require('express');
const { addOrder, getOrders } = require('../controllers/ordersControllers.js');
const router = Router();

router.get('/all', getOrders)
router.post('/', addOrder);

module.exports = router;