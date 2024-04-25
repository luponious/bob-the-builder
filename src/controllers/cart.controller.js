import { cartsService } from "../services/carts.service.js";
import { errorMan } from "../daos/utils/errorMan.js";

export async function getCartsController(req, res, next) {
  try {
    const carts = await cartsService.readMany();
    if (!carts.length) {
      const error = new Error("No se encontraron carritos.");
      error.code = errorMan.NOT_FOUND;
      throw error;
    }

    res.json(carts);
  } catch (error) {
    next(error);
  }
}

export async function getCartController(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("El ID es requerido");
      error.code = errorMan.INCORRECT_DATA;
      throw error;
    }

    const cart = await cartsService.readOne(id);
    if (!cart) {
      const error = new Error(`No se encontró ningún carrito con el ID ${id}`);
      error.code = errorMan.NOT_FOUND;
      throw error;
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
}

export async function postCartController(req, res, next) {
  try {
    const newCart = await cartsService.createOne();
    if (!newCart) {
      const error = new Error("No se pudo crear el carrito");
      error.code = errorMan.UNEXPECTED_ERROR;
      throw error;
    }

    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
}

export async function addLibroToCartController(req, res, next) {
  try {
    const { id, pid } = req.params;
    const { quantity = 1 } = req.body;

    const updatedCart = await cartsService.addLibroToCart(id, pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
}

export async function updateLibroCartController(req, res, next) {
  try {
    const { id, pid } = req.params;
    const { quantity } = req.body;

    const updatedCart = await cartsService.addlibroToCart(id, pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
}

export async function deleteLibroFromCartController(req, res, next) {
  try {
    const { id, pid } = req.params;

    const updatedCart = await cartsService.deleteLibroFromCart(id, pid);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
}

export async function deleteLibrosFromCartController(req, res, next) {
  try {
    const { id } = req.params;

    const updatedCart = await cartsService.deleteLibrosFromCart(id);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
}

