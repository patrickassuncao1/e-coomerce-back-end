/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { v4 as uuid } from "uuid";
import { app } from "../../../app";
import { prismaClient } from "../../../config/database/prismaClient";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";

describe('Create Comment Controller', () => {
    
    let productId = '';
    beforeAll(async () => {

        const response = await prismaClient.product.create({
            data: {
                name: 'Test integration comment',
                path: "http://localhost:5000/img/products/t-shirt-3.webp",
                price: 20.0
            }
        })

        productId = response.id;
    });

    it('should be able to create a new comment', async () => {
        const generateTokenProvider = new GenerateTokenProvider();

        const token = await generateTokenProvider.execute(uuid());

        const response = await request(app).post("/api/comment/create")
            .send({
                comment: 'Comment test integration',
                username: "Name test",
                productId: productId
            }).auth(token, { type: 'bearer' });

        const { comment, message } = response.body;

        expect(response.status).toBe(200);
        expect(message).toBe('Cadastrado com sucesso');
        expect(comment).toHaveProperty('id');

    })

    it('should not create a new comment if the product does not exist', async () => {
        const generateTokenProvider = new GenerateTokenProvider();

        const token = await generateTokenProvider.execute(uuid());
        const response = await request(app).post("/api/comment/create")
            .send({
                comment: 'Comment test integration',
                username: "Name test",
                productId: uuid()
            }).auth(token, { type: 'bearer' });

        expect(response.body.message).toBe('Produto não encontrado')


    })

})