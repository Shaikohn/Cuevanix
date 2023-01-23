const { Router } = require('express');
const userRouter = require('./userRoutes');
const favouritesRouter = require('./favouritesRoutes')
const movieRouter = require('./movieRoutes');
const { receivePayment } = require('../controllers/StripeControllers');
const ordersRouter = require('./ordersRoutes');
const inquiriesRouter = require('./inquirieRoutes')

const router = Router();

router.use('/user', userRouter);
router.use('/movies', movieRouter)
router.use('/favourites', favouritesRouter)
router.use('/payment', receivePayment)
router.use('/order', ordersRouter)
router.use('/inquiries', inquiriesRouter)

module.exports = router;