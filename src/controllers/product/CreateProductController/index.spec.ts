
/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../../app";

describe('Create Product Controller', () => {
    
    it('should be able to create a new product', async () => {

        const response = await request(app).post("/api/products/create").send({
            path: "http://localhost:5000/img/products/t-shirt-3.webp",
            name: "T-shirt test integration",
            price: 20.0
        });

        const { product } = response.body

        expect(response.status).toBe(200);
        expect(product).toHaveProperty('id');

    })
})