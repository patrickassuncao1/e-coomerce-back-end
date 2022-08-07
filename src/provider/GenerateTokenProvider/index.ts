import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId: string) {

        const token = sign({}, process.env.KEY_TOKEN!, {
            subject: userId,
            expiresIn: "2h"
        });

        return token;
    }
}

export { GenerateTokenProvider };