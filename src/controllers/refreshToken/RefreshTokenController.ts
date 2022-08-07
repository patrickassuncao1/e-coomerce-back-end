import { Request, Response } from "express";
import { RefreshToken } from "./refreshToken";

class RefreshTokenController {
    async handle(request: Request, response: Response) {
        const { refresh_token } = request.body;

        const refreshToken = new RefreshToken();

        const token = await refreshToken.execute(refresh_token);

        return response.json(token);

    }
}

export { RefreshTokenController };