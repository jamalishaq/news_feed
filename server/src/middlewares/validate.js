import { BadRequestError } from '../utils/AppError';

/**
 * Creates an Express middleware function to validate a request body 
 * against a Zod schema.
 * * @param {import('zod').AnyZodObject} schema The Zod schema object (e.g., PostZodSchema).
 * @returns {import('express').RequestHandler} Express middleware function.
 */
const validate = (schema) => (req, res, next) => {
    try {
        // Attempt to validate the request body
        // parse() throws an error if validation fails
        schema.parse(req.body); 

        // If successful, proceed to the next middleware/controller
        next(); 

    } catch (error) {
        // If validation fails, 'error' will be a ZodError instance.
        if (error.name === 'ZodError') {
            // Transform the Zod error details into a cleaner, more readable format
            const errors = error.issues.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            
            next(new BadRequestError({
                code: "BAD_REQUEST",
                message: 'Validation failed for request body.',
                details: errors,
                suggestion: "Check reques body data"
            }));
        }

        // For any other unexpected errors, pass them to the Express error handler
        next(error);
    }
};

export default validate;