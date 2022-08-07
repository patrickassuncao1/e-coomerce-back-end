import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";
import { AppError } from "../../../errors/AppError";

class CreateCommentController {
    async handle(request: Request, response: Response) {
        const { username, comment, productId } = request.body;
    
        const product = await prismaClient.product.findFirst({
            where: {
                id: productId,
            }
        });

        if(!product){
            throw new AppError('Produto não encontrado');
        }

        const commentUser = await prismaClient.comment.create({
            data: {
               comment: comment,
               username: username,
               productId: productId
            }
        })
        return response.json({ message: "Cadastrado com sucesso", comment: commentUser });
    }
}

export { CreateCommentController };