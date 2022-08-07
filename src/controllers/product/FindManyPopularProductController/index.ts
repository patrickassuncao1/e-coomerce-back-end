import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";

class FindManyPopularProductController {
    async handle(request: Request, response: Response) {
        const product = await prismaClient.product.findMany({
            orderBy:{
                name: 'asc'
            },
            take:3
        });
        return response.json(product);
    }
}

export { FindManyPopularProductController };