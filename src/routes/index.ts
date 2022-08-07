import { Router } from "express";
import { AuthController } from "../controllers/auth/AuthController";
import { CreateCommentController } from "../controllers/comment/CreateCommentController";
import { CreateProductController } from "../controllers/product/CreateProductController";
import { FindFirstProductController } from "../controllers/product/FindFirstProductController";
import { FindManyPopularProductController } from "../controllers/product/FindManyPopularProductController";
import { FindManyProductController } from "../controllers/product/FindManyProductController";
import { RefreshTokenController } from "../controllers/refreshToken/RefreshTokenController";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { FindFirstUserController } from "../controllers/users/FindFirstUserController";
import { ensureAuth } from "../middleware/ensureAuth";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { commentSchema } from "../validations/comment";
import { productSchema } from "../validations/products";
import { userSchema, userSchemaLogin } from "../validations/user";

const route = Router();

//product
const createProductController = new CreateProductController();
const findManyProductController = new FindManyProductController();
const findFirstProductController = new FindFirstProductController();7
const findManyPopularProductController = new FindManyPopularProductController();

//user
const createUserController = new CreateUserController();
const authController = new AuthController();
const refreshToken = new RefreshTokenController();
const findFirstUserController = new FindFirstUserController();

//comments 
const createCommentController = new CreateCommentController();

//product
route.post('/products/create', validationMiddleware(productSchema), createProductController.handle);
route.get('/products/all', findManyProductController.handle);
route.get('/products/first/:id', findFirstProductController.handle);
route.get('/products/popular', findManyPopularProductController.handle);

//user 
route.post('/user/create', validationMiddleware(userSchema), createUserController.handle);
route.post('/user/login', validationMiddleware(userSchemaLogin), authController.handle);
route.post('/user/refresh-token', refreshToken.handle);

//comments
route.post('/comment/create',  [ensureAuth(process.env.KEY_TOKEN!), validationMiddleware(commentSchema)], createCommentController.handle)
//auth 
route.get('/user/first/:id', ensureAuth(process.env.KEY_TOKEN!), findFirstUserController.handle);

export { route };
