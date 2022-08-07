/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { prismaClient } from "../../../config/database/prismaClient";
import request from "supertest";
import { app } from "../../../app";

describe('Find First Product Controller', () => {
    let id = '';
    beforeEach(async () => {
        const response = await prismaClient.product.create({
            data: {
                path: "http://localhost:5000/img/products/t-shirt-3.webp",
                name: "T-shirt test integration",
                price: 20.0
            }
        })

        id = response.id;

    });
    
    it('should return the product by id', async () => {

        const response = await request(app).get("/api/products/first/" + id);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Comments');

    })
})