import fs from "fs/promises";
import { randomUUID } from "node:crypto";
import { errorMan } from "../utils/errorMan.js";
import { toPOJO, matches } from "../utils/utils.js";

export class CartsDaoFiles {
    constructor(path) {
        this.path = path;
    }

    async #readCarts() {
        try {
            const { path } = this;
            const carts = JSON.parse(await fs.readFile(path, "utf-8"));
            return carts;
        } catch (error) {
            const typedError = new Error(
                "#readCarts DAO.FILE Error: ",
                error.code || error
            );
            typedError.code = errorMan.UNEXPECTED_ERROR;
            throw typedError;
        }
    }

    async #writeCarts(carts) {
        try {
            const { path } = this;
            await fs.writeFile(path, JSON.stringify(carts, null, 2));
        } catch (error) {
            const typedError = new Error(
                "#writeCarts DAO.FILE Error: ",
                error.code || error
            );
            typedError.code = errorMan.UNEXPECTED_ERROR;
            throw typedError;
        }
    }

    async createOne() {
        try {
            const newCart = {
                id: randomUUID(),
                libros: [],
            };

            const carts = await this.#readCarts();
            carts.push(newCart);

            await this.#writeCarts(carts);

            return newCart;
        } catch (error) {
            console.log("Create cart Error: ", error);
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async readOne(id) {
        try {
            const carts = await this.#readCarts();
            const cartFound = carts.find((cart) => matches(cart.id, id));
            return cartFound ? toPOJO(cartFound) : null;
        } catch (error) {
            const typedError = new Error(
                `Error al obtener el carrito: ${error.message}`
            );
            typedError.code = errorMan.UNEXPECTED_ERROR;
            throw typedError;
        }
    }

    async readMany() {
        try {
            const carts = await this.#readCarts();
            return carts.map(toPOJO);
        } catch (error) {
            const typedError = new Error(
                `Error al obtener los carritos: ${error.message}`
            );
            typedError.code = errorMan.UNEXPECTED_ERROR;
            throw typedError;
        }
    }


    async updateOne(cartId, libroId, quantity) {
        try {
            const carts = await this.#readCarts();
            const cartIndex = carts.findIndex((cart) => cart.id === cartId);

            if (cartIndex === -1) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            const updatedCart = { ...carts[cartIndex] };
            let existinglibroIndex = updatedCart.libros.findIndex(
                (libro) => libro._id === libroId
            );

            if (existinglibroIndex !== -1) {
                updatedCart.libros[existinglibroIndex].quantity +=
                    parseInt(quantity);

                if (updatedCart.libros[existinglibroIndex].quantity <= 0) {
                    updatedCart.libros.splice(existinglibroIndex, 1);
                }
            } else {
                if (parseInt(quantity) <= 0) {
                    const error = new Error(
                        "No se puede agregar un libro con cantidad menor a 0"
                    );
                    error.code = errorMan.INCORRECT_DATA;
                    throw error;
                }

                updatedCart.libros.push({ _id: libroId, quantity });
            }

            carts[cartIndex] = updatedCart;
            await this.#writeCarts(carts);

            return updatedCart;
        } catch (error) {
            console.log("Error agregar libro al cart: ", error);
            throw new Error(
                `Error al agregar el libro al carrito: ${error.message}`
            );
        }
    }
}

const cartManager = new CartsDaoFiles();

export default cartManager;
