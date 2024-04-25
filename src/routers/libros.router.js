import { Router } from "express";
import {
    deleteLibrosController, getLibrosController,
    postLibrosController, putLibrosController,
} from "../controllers/libros.controller.js";
import {
    validateLibroData, validateId, validateUpdates, // Correct imports
} from "../middlewares/validation.js"; // Correct import

import { tieneRol } from "../middlewares/authorization.js";
import passport from "passport";

export const librosRouter = Router();

// Define middleware functions
const authenticateJWT = passport.authenticate("jwt", { failWithError: true, session: false });
const adminAuthorization = tieneRol(["admin"]);

// GET
librosRouter.get("/", getLibrosController);
librosRouter.get("/:id", validateId, getLibrosController);

// POST
librosRouter.post(
    "/",
    authenticateJWT,
    adminAuthorization,
    validateLibroData, // Correct usage
    postLibrosController
);

// PUT
librosRouter.put(
    "/:id",
    authenticateJWT,
    adminAuthorization,
    validateUpdates, // Correct usage
    putLibrosController
);

// DELETE
librosRouter.delete(
    "/:id",
    authenticateJWT,
    adminAuthorization,
    validateId,
    deleteLibrosController
);
