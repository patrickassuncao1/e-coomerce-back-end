import dayjs from "dayjs";
import { prismaClient } from "../../config/database/prismaClient";


class GenerateRefreshToken {
    async execute(userId: string) {
        const expireIn = dayjs().add(10, "hours").unix();

        const generateRefreshToken = await prismaClient.refreshToken.create({
            data: {
                userId: userId,
                expiresIn: expireIn
            }
        })

        return generateRefreshToken;
    }

}

export { GenerateRefreshToken };