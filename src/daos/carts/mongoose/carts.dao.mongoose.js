import { errorMan } from "../../../daos/utils/errorMan.js";
import { toPOJO } from "../../utils/utils.js";

export class CartsDaoMongoose {
  constructor(cartsModel) {
    this.cartModel = cartsModel;
  }

  async readMany() {
    const carts = await this.cartModel.find().lean();
    return toPOJO(carts);
  }

  async readOne(id) {
    const cart = await this.cartModel.findById(id).lean();
    return toPOJO(cart);
  }

  async createOne() {
    const cart = await this.cartModel.create({});
    return toPOJO(cart);
  }

  async updateOne(cartId, libroId, quantity) {
    try {
      // Validación de datos
      if (!cartId || !libroId || !quantity || isNaN(quantity)) {
        const error = new Error(
          "DATA type tipo numero requerido."
        );
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      //Find cart por id
      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorMan.NOT_FOUND;
        throw error;
      }

      // Find libro en cart
      const existingLibro = cart.libros.find(
        (libro) => libro._id === libroId
      );

      if (existingLibro) {
        // IF [existe] actualiza la cantidad
        existingLibro.quantity += parseInt(quantity);

        // IF cantidad -= 0 saca del cart
        if (existingLibro.quantity <= 0) {
          cart.libros = cart.libros.filter(
            (libro) => libro._id !== libroId
          );
        }
      } else {
        // agrega al cart
        if (parseInt(quantity) > 0) {
          cart.libros.push({ _id: libroId, quantity: parseInt(quantity) });
        }
      }


      await cart.save();

      if (cart.libros.length === 0) {
        return { _id: cart._id, libros: [] };
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    const cart = await this.cartModel.findByIdAndDelete(id).lean();
    return toPOJO(cart);
  }

  async deletelibroFromCart(cartId, libroId) {
    try {
      if (!cartId || !libroId) {
        const error = new Error("IDs requeridos!");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorMan.NOT_FOUND;
        throw error;
      }

      cart.libros = cart.libros.filter(
        (libro) => libro._id !== libroId
      );

      await cart.save();

      return cart;
    } catch (error) {
      console.error("Delete from DB error: ", error);
      throw new Error(
        `Error al eliminar el libro del carrito: ${error.message}`
      );
    }
  }

  async deletelibrosFromCart(cartId) {
    try {
      if (!cartId) {
        const error = new Error("Se requiere un ID para borrar el Cart");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorMan.NOT_FOUND;
        throw error;
      }

      cart.libros = [];

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(
        `Error al eliminar libros del carrito: ${error.message}`
      );
    }
  }
}
