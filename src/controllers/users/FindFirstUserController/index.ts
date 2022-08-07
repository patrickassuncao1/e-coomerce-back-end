import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";

class FindFirstUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        
        const user = await prismaClient.user.findFirst({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true
            }
        });
        return response.json(user);
    }
}

export { FindFirstUserController };