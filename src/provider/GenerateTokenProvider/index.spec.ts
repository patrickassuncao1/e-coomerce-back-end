import { GenerateTokenProvider } from "."
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

describe('Generate Token Provider', () => {

    dotenv.config();
    it('should Generate Token', async () => {
        const generateTokenProvider = new GenerateTokenProvider();

        const token = await generateTokenProvider.execute(uuid()); 

        expect(token).toBeTruthy();
    })
})