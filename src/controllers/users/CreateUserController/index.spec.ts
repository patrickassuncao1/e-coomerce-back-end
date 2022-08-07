/**
 * @jest-environment ./prisma/prisma-environment-jest
 */


import request from "supertest";
import { app } from "../../../app";
import { prismaClient } from "../../../config/database/prismaClient";

describe("Create User Controller", () => {

  afterEach(async () => {
    await prismaClient.user.deleteMany();
  });

  it("should be able to create a new user", async () => {

    const response = await request(app).post("/api/user/create").send({
      password: "12345",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email");

  });

  it("should not be able to create an existing user", async () => {


    await request(app).post("/api/user/create").send({
      name: "test-integration-exist",
      email: "testIntegrationExisting@test.com.br",
      password: "12345",
    });

    const response = await request(app).post("/api/user/create").send({
      name: "test-integration-exist",
      email: "testIntegrationExisting@test.com.br",
      password: "12345",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuário já existente');



  });

});