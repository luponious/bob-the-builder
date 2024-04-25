import { errorMan } from '../daos/utils/errorMan.js';

export async function validateLibroData(req, res, next) {
    try {
        const {
            title, description,
            price, code, status, stock, category,
        } = req.body;

        const errors = [];
        if (!title) {
            errors.push("El título es requerido.");
        }
        // TODO Add other validation checks for description, price, code, etc.

        if (errors.length > 0) {
            const error = new Error("Validation failed. Libro data is invalid.");
            error.code = errorMan.INCORRECT_DATA;
            error.errors = errors;
            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function validateId(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error("Falta el parámetro 'id'");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function validateUpdates(req, res, next) {
    try {
        const updates = req.body;

        if (Object.keys(updates).length === 0) {
            throw new Error("No se recibieron datos para actualizar");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function validateAdminUser(req, res, next) {
    try {
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized: Only admin users can access this functionality' });
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function validatePremiumUser(req, res, next) {
    try {
        const userRole = req.user.role;

        if (userRole !== 'premium') {
            return res.status(403).json({ error: 'Unauthorized: Only premium users can access this functionality' });
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function validateNormalUser(req, res, next) {
    try {
        const userRole = req.user.role;

        if (userRole !== 'normal') {
            return res.status(403).json({ error: 'Unauthorized: Only normal users can access this functionality' });
        }

        next();
    } catch (error) {
        next(error);
    }
}

