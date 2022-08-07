import { compare } from "bcryptjs";
import { prismaClient } from "../../config/database/prismaClient";
import { AppError } from "../../errors/AppError";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";


type RequestType = {
    email: string,
    password: string
}

class Auth {
    async execute({ email, password }: RequestType) {
        const usersAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });


        if (!usersAlreadyExists) {
            throw new AppError('Email ou senha incorreta');
        }

        const passwordMatch = await compare(password, usersAlreadyExists.password);

        if (!passwordMatch) throw new AppError('Email ou senha incorreta');

        // gerar token do usuario

        const generateToken = new GenerateTokenProvider();
        const token = await generateToken.execute(
            usersAlreadyExists.id
        );

        const refreshTokenExists = await prismaClient.refreshToken.findFirst({
            where: {
                userId: usersAlreadyExists?.id
            }
        })

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        //refresh token
        if (!refreshTokenExists) {
            const generateRefreshToken = new GenerateRefreshToken();
            const refreshToken = await generateRefreshToken.execute(usersAlreadyExists.id);
            return { token, refreshToken, user }
        } else {
            const refreshToken = refreshTokenExists;
            return { token, refreshToken, user };
        }

    }
}

export { Auth };