import { OrdersDaoFiles } from "../daos/orders/orders.dao.files.js";
import { OrdersDaoMongoose } from "../daos/orders/mongoose/orders.dao.mongoose.js";
import { errorMan } from "../daos/utils/errorMan.js";

export class OrdersService {
    async createOne(orderData) {
        try {
            const newOrder = await OrdersDaoMongoose.createOne(orderData);
            if (!newOrder) {
                const error = new Error("No se pudo crear la orden");
                error.code = errorMan.UNEXPECTED_ERROR;
                throw error;
            }

            return newOrder;
        } catch (error) {
            throw error;
        }
    }
}

export const ordersService = new OrdersService();
