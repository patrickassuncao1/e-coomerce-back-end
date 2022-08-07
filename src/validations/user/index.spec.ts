import { userSchema, userSchemaLogin } from ".";

describe("User validation Register", () => {
    it("should return error message, if the name attribute is empty", async () => {

        const fakeData = {
            password: 'passwordTest',
            email: 'email@test.com'
        };

        try {
            await userSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('name is a required field');
        }
    });

    it("should return error message, if the email attribute is empty", async () => {

        const fakeData = {
            password: 'passwordTest',
            name: 'Name Test'
        };

        try {
            await userSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('email is a required field');
        }
    });

    it("should return error message, if the password attribute is empty", async () => {

        const fakeData = {
            email: 'email@test.com',
            name: 'Name Test'
        };

        try {
            await userSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('password is a required field');
        }
    });


    it("should return error message, if the password length is less than 4", async () => {

        const fakeData = {
            email: 'email@test.com',
            name: 'Name Test',
            password: 123
        };

        try {
            await userSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('password must be at least 4 characters');
        }
    });


});
