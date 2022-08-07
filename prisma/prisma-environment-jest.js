const NodeEnvironment = require("jest-environment-node").default;
const { execSync } = require('child_process');
const { resolve } = require("path");
const { v4: uuid } = require("uuid");
const { Client } = require("pg");

const prismaCli = './node_modules/.bin/prisma';

require('dotenv').config({
    path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
        this.schema = `schema_${uuid()}`;
        console.log(this.schema);
        this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
    }

    async setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        // Rodar as migrations
        execSync('npx prisma migrate deploy');
    }

    async teardown() {
        const client = new Client({
            connectionString: this.connectionString,
        });

        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "public${this.schema}" CASCADE`);
        await client.end();
    }
}

module.exports = CustomEnvironment;