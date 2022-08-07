import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


const ensureAuth = (key: string) => (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: "Unauthorized"
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, key);
        return next();
    } catch (error) {
        return response.status(401).json({
            message: "Token Invalid"
        });
    }

}

export { ensureAuth };