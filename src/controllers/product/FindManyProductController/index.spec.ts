/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../../app";
import { prismaClient } from "../../../config/database/prismaClient";

describe('Find Many Product Controller', () => {

    beforeAll(async () => {

        await prismaClient.product.createMany({
            data: [
                {
                    path: "http://localhost:5000/img/products/t-shirt-1.webp",
                    name: "T-shirt test integration",
                    price: 20.0
                },
                {
                    path: "http://localhost:5000/img/products/t-shirt-2.webp",
                    name: "T-shirt test integration 2",
                    price: 20.0
                },

                {
                    path: "http://localhost:5000/img/products/t-shirt-3.webp",
                    name: "T-shirt test integration 3",
                    price: 20.0
                },

                {
                    path: "http://localhost:5000/img/products/t-shirt-4.webp",
                    name: "T-shirt test integration 4",
                    price: 20.0
                },

            ],
            skipDuplicates: true,
        })


    })


    it('should return all products', async () => {

        const response = await request(app).get('/api/products/all');
        expect(response.status).toBe(200);
        expect(response.body.length === 4).toBeTruthy();

    })
})