const { Router } = require('express');
const userRouter = require('./userRoutes');
const favouritesRouter = require('./favouritesRoutes')
const movieRouter = require('./movieRoutes');
const { receivePayment } = require('../controllers/StripeControllers');
const ordersRouter = require('./ordersRoutes');

const router = Router();

router.use('/user', userRouter);
router.use('/movies', movieRouter)
router.use('/favourites', favouritesRouter)
router.use('/payment', receivePayment)
router.use('/order', ordersRouter)

module.exports = router;