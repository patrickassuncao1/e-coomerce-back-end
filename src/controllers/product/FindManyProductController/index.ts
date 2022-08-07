import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";

class FindManyProductController {
    async handle(request: Request, response: Response) {
        const product = await prismaClient.product.findMany({
            orderBy:{
                name: 'asc'
            }
        });
        return response.json(product);
    }
}

export { FindManyProductController };