import * as yup from 'yup';

export const userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(50).required()
})

export const userSchemaLogin = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});
