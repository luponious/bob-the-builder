import { daoLibros } from "../daos/libros/libros.dao.js"
import cartManager from "../daos/carts/carts.dao.files.js";
import { errorMan } from "../daos/utils/errorMan.js";


class CartsService {
  async readMany() {
    try {
      return cartManager.readMany(); 
    } catch (error) {
      throw new Error(`Error en CartsService.readMany: ${error}`);
    }
  }

  async readOne(id) {
    try {
      if (!id) {
        const error = new Error("El ID es requerido");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const cart = await cartManager.readOne(id); 
      if (!cart) {
        const error = new Error(
          `No se encontró ningún carrito con el ID ${id}`
        );
        error.code = errorMan.NOT_FOUND;
        throw error;
      }
      return cart;
    } catch (error) {
      throw new Error(`Error en CartsService.readOne: ${error}`);
    }
  }

  async createOne() {
    try {
      const createdCart = await cartManager.createOne({}); 
      if (!createdCart) {
        const error = new Error("No se pudo crear el carrito");
        error.code = errorMan.UNEXPECTED_ERROR;
        throw error;
      }
      return createdCart;
    } catch (error) {
      throw new Error(`Error en CartsService.createOne: ${error}`);
    }
  }

  async addLibroToCart(cartId, libroId, quantity) {
    try {
      if (!cartId || !libroId || !quantity) {
        const error = new Error("Se requieren cartId, libroId y quantity.");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const cart = await cartManager.readOne(cartId); 
      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorMan.NOT_FOUND;
        throw error;
      }

      const libro = await daoLibros.readOne(libroId); 
      if (!libro) {
        const error = new Error("libro no encontrado.");
        error.code = errorMan.NOT_FOUND;
        throw error;
      }

      if (isNaN(quantity)) {
        const error = new Error("quantity debe ser un número.");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const updatedCart = await cartManager.updateOne(cartId, libroId, quantity);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }



  async deleteLibroFromCart(cartId, libroId) {
    try {
      if (!cartId || !libroId) {
        const error = new Error("Se requieren ids de cart y libro.");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const updatedCart = await daoCarts.deleteLibroFromCart(
        cartId,
        libroId
      );
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async deleteLibrosFromCart(cartId) {
    try {
      if (!cartId) {
        const error = new Error("Se requiere un cartId.");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const updatedCart = await daoCarts.deleteLibrosFromCart(cartId);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(cartId) {
    return daoCarts.deleteCart(cartId);
  }
}


export const cartsService = new CartsService();