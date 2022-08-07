import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prismaClient } from "../../../config/database/prismaClient";
import { AppError } from "../../../errors/AppError";


class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password} = request.body;

        const usersAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (usersAlreadyExists) {
            throw new AppError('Usuário já existente');
        }

        const hashedPassword = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        return response.json({ message: "Cadastrado com sucesso", email: user.email });
    }
}

export { CreateUserController };