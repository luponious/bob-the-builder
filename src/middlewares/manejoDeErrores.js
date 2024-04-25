// Tipos de erros
export const errorsMap = {
    INCORRECT_DATA: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    DUPLICATED_KEY: 409,
    UNPROCESSABLE_ENTITY: 422,
    UNEXPECTED_ERROR: 500,
    INTERNAL_SERVER_ERROR: 500,
};
//chequea si el error existe en el mapa
export function manejoDeErrores(error, req, res, next) {
    // Check if the error code exists in the errorMan
    const errorCode = errorsMap[error.code] || 500; // Default to 500 if not found
    // Set the HTTP status code
    res.status(errorCode);
    // Send the error message as JSON response
    res.json({ status: 'error', message: error.message });
}
