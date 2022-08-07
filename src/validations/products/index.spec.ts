import { productSchema } from ".";


describe("Product validation ", () => {
    it("should return error message, if the name attribute is empty", async () => {

        const fakeData = {
            name: '',
            path: 'localhost/path',
            price: 20

        };

        try {
            await productSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('name is a required field');
        }
    });

    it("should return error message, if the path attribute is empty", async () => {
        const fakeData = {
            name: 'Name Test',
            price: 20
        };

        try {
            await productSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('path is a required field');
        }
    });

    it("should return error message, if the price attribute is empty", async () => {
        const fakeData = {
            name: 'Name Test',
            path: 'localhost/path'
        };

        try {
            await productSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('price is a required field');
        }
    });

    it("should return error message, if the price length is larger than 11", async () => {
        const fakeData = {
            name: 'Name Test',
            path: 'localhost/path',
            price: 1234567891011
        };

        try {
            await productSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('Max 11 numbers');
        }
    });


});