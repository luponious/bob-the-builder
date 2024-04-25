import { Router } from 'express'
import { postController, postLibrosController } from '../controllers/tiendas.controller.js'

export const tiendasRouter = Router()

tiendasRouter.post('/', postController)
tiendasRouter.post('/:id/libros', postLibrosController)

//[TO-DO]
// tiendasRouter.delete('/:idTienda/livros/:idLibro', deleteLibroController)
// cartsRouter.update('/:idCart/libros/:idLibr', updateLibroCantController)