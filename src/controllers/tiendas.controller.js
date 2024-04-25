import { tiendasService } from '../services/index.js'

// Registrar
export async function postController(req, res, next) {
  try {
    const tienda = await tiendasService.registrar(req.body)
    res.created(tienda)
  } catch (error) {
    next(error)
  }
}

// Agregar
export async function postLibrosController(req, res, next) {
  try {
    await tiendasService.agregarLibro(req.params.id, req.body.idLibro)
    res.updated()
  } catch (error) {
    next(error)
  }
}