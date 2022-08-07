import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";

class FindFirstProductController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const product = await prismaClient.product.findFirst({
            where: {
                id: id
            },
            include: {
                Comments: {
                    select: {
                        comment: true,
                        username: true
                    },
                    orderBy: {
                        created_ad: 'desc'
                    }
                }
            }
        });
        return response.json(product);
    }
}

export { FindFirstProductController };