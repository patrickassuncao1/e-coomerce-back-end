import { Request, Response } from "express";
import { Auth } from "./Auth";


class AuthController {

    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        const auth = new Auth();

        const token = await auth.execute({
            email: email,
            password: password
        });

        return response.json(token);
    }
}

export { AuthController }