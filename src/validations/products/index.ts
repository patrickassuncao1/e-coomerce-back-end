import * as yup from 'yup';

export const productSchema = yup.object({
    price: yup.number().required().test('len', 'Max 11 numbers', (val) => val ? val.toString().length <= 11 : false),
    name: yup.string().required(),
    path: yup.string().required(),
});