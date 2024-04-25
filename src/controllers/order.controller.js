import { cartsService } from "../services/carts.service.js";
import { librosService } from "../services/libros.services.js";
import { ordersService } from "../services/order.services.js";
import { errorMan } from "../daos/utils/errorMan.js";

export async function postOrderController(req, res, next) {
    try {
        const { email, cart: userCart } = req.body;

        // 1 carrito
        const cart = await cartsService.readOne(userCart[0]._id);

        // El carrito existe?
        if (!cart) {
            throw new Error(errorMan.NOT_FOUND.message);
        }

        // Check stock actualiza IF necesario
        const librosWithoutStock = [];
        let amount = 0;
        for (const libro of cart.libros) {
            const { _id, quantity } = libro;
            const libroInfo = await librosService.readOne(_id);

            if (!libroInfo || libroInfo.stock < quantity) {
                librosWithoutStock.push({
                    libro: _id,
                    stock: libroInfo ? libroInfo.stock : 0,
                });
            } else {
                // quant- stock actualiza n/ libroo
                libroInfo.stock -= quantity;
                amount += libroInfo.price * quantity;
                await librosService.updateOne(_id, libroInfo);
            }
        }

        // si falta libro sin stock
        if (librosWithoutStock.length > 0) {
            const error = new Error(errorMan.UNPROCESSABLE_ENTITY.message);
            error.libros = librosWithoutStock;
            throw error;
        }

        // Crear la orden
        const newOrder = await ordersService.createOne({
            purchaser: email,
            amount: amount,
        });

        // Limpiar el carrito
        await cartsService.deletelibrosFromCart(userCart[0]._id);

        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
}
