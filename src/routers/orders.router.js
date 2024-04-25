import { Router } from "express";
import { postOrderController } from "../controllers/order.controller.js";

export const ordersRouter = Router();

ordersRouter.post("/", postOrderController);
