/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../../app";
import { prismaClient } from "../../../config/database/prismaClient";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";
import { v4 as uuid } from "uuid";

describe("Find First User Controller", () => {
    let id = '';

    beforeAll(async () => {
        const response = await prismaClient.user.create({
            data: {
                email: 'testIntegrationFirstUser@test.com.br',
                password: '12345',
                name: 'Test Name'
            }
        })

        id = response.id;
    });

    it("should return the logged in user", async () => {

        const generateTokenProvider = new GenerateTokenProvider()

        const token = await generateTokenProvider.execute(id);

        const response = await request(app).get(`/api/user/first/${id}`).
            auth(token, { type: 'bearer' });

        expect(response.status).toBe(200);

    });

    it("should only have access to authenticated users", async () => {

        const response = await request(app).get(`/api/user/first/${id}`).
            auth(uuid(), { type: 'bearer' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Token Invalid');

    });

});