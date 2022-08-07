import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validationMiddleware = (schema: AnySchema) =>
    async (request: Request, response: Response, next: NextFunction) => {
        const body = request.body;
        try {
            await schema.validate(body, { abortEarly: false });
            return next();
        } catch (error) {
            return response.status(400).json(error);
        }
    }