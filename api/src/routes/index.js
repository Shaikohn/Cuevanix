const { Router } = require('express');
const userRouter = require('./userRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/user', userRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;