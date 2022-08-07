import { commentSchema } from ".";

describe("Comment validation ", () => {
    
    it("should return error message, if the username attribute is empty", async () => {

        const fakeData = {
            productId: '87133fe6-49ad-4489-9ef0-7a1edefad714',
            comment: 'comment'
        };

        try {
            await commentSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('username is a required field');
        }
    });

    it("should return error message, if the productId attribute is empty", async () => {
        const fakeData = {
            username: 'Name Test',
            comment: 'comment'
        };

        try {
            await commentSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('productId is a required field');
        }
    });

    it("should return error message, if the comment attribute is empty", async () => {
        const fakeData = {
            username: 'Name Test',
            productId: '87133fe6-49ad-4489-9ef0-7a1edefad714'
        };

        try {
            await commentSchema.validate(fakeData);
        } catch (error: any) {
            expect(error.message).toBe('comment is a required field');
        }
    });


});