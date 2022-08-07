import dayjs from "dayjs";
import { prismaClient } from "../../config/database/prismaClient";
import { AppError } from "../../errors/AppError";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";


class RefreshToken {
    async execute(refresh_token: string) {
        
        const refreshToken = await prismaClient.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if (!refreshToken || !refresh_token) {
            throw new AppError("Refresh Token invalid");
        }

        const generateToken = new GenerateTokenProvider();

        const token = await generateToken.execute(
            refreshToken.userId,
        );

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        console.log(refreshTokenExpired);
        if (refreshTokenExpired) {
            await prismaClient.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            });

            const generateRefreshToken = new GenerateRefreshToken();
            const newRefreshTokenUser = await generateRefreshToken.execute(refreshToken.userId);

            return { token, refreshToken: newRefreshTokenUser };
        }


        return { token };


    }

}

export { RefreshToken };