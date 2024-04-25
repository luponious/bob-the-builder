import { usersService } from '../services/user.services'

// Registrar
export async function postController(req, res, next) {
  try {
    const user = await usersService.registrar(req.body)
    res.result(user)
  } catch (error) {
    next(error)
  }
}

// Dar de baja
export async function deleteController(req, res, next) {
  try {
    await usersService.darDeBaja(req.params.id)
    res.deleted()
  } catch (error) {
    next(error)
  }
}