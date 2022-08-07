import * as yup from 'yup';

export const commentSchema = yup.object({
    comment: yup.string().required().max(197),
    productId: yup.string().required(),
    username: yup.string().required()
});
