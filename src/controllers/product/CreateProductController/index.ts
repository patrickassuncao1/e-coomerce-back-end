import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, path, price } = request.body;

        const product = await prismaClient.product.create({
            data: {
                name: name,
                path: path,
                price: price
            }
        })
        return response.json({ message: "Cadastrado com sucesso", product });
    }
}

export { CreateProductController };