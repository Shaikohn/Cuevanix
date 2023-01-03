const { Router } = require('express');
const router = Router();

const { receivePayment } = require('../controllers/Stripe/StripeControllers.js')

router.post('/', receivePayment);


module.exports = router;