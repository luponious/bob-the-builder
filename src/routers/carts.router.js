import { Router } from "express";
import { validateId } from "../middlewares/validation.js";
import {
  addLibroToCartController,
  deleteLibroFromCartController,
  deleteLibrosFromCartController,
  getCartController,
  getCartsController,
  postCartController,
  updateLibroCartController,
} from "../controllers/cart.controller.js";
import passport from "passport";
import { tieneRol } from "../middlewares/authorization.js";

export const cartsRouter = Router();

cartsRouter.get("/", getCartsController);

// cart por id
cartsRouter.get("/:id", validateId, getCartController);

// nuevo cart
cartsRouter.post("/", postCartController);

// add libro por id
cartsRouter.post(
  "/:id/libro/:pid",
  passport.authenticate("jwt", { failWithError: true, session: false }),
  tieneRol(["user", "admin"]),
  validateId,
  addLibroToCartController
);

// dele por id
cartsRouter.delete(
  "/:id/libro/:pid",
  validateId,
  deleteLibroFromCartController
);

//put & delete al carrido cantidades
cartsRouter.put("/:id/libro/:pid", validateId, updateLibroCartController);
cartsRouter.delete("/:id", validateId, deleteLibrosFromCartController);
