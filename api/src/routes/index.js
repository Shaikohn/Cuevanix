const { Router } = require('express');
const userRouter = require('./userRoutes');
const favouritesRouter = require('./favouritesRoutes')
const movieRouter = require('./movieRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/user', userRouter);
router.use('/movies', movieRouter)
router.use('/favourites', favouritesRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;