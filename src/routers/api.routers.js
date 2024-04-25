import { Router, json, urlencoded } from 'express';
import { librosRouter } from './libros.router.js';
import { usersRouter } from './users.router.js';
import { sesionesRouter } from './sesiones.router.js';
import { tiendasRouter } from './tiendas.router.js';
import { cartsRouter } from './carts.router.js';
import { ordersRouter } from './orders.router.js';
import { manejoDeErrores } from '../middlewares/manejoDeErrores.js';
import { respuestasMejoradas } from '../middlewares/respuestasMejoradas.js';

export const apiRouter = Router();

apiRouter.use(respuestasMejoradas);
apiRouter.use(json());
apiRouter.use(urlencoded({ extended: true }));

// Register routers for different endpoints
apiRouter.use('/users', usersRouter);
apiRouter.use('/sesiones', sesionesRouter);
apiRouter.use('/libros', librosRouter);
apiRouter.use('/tiendas', tiendasRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/orders', ordersRouter);

// Use error handling middleware
apiRouter.use(manejoDeErrores);
