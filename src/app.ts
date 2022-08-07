import "express-async-errors";
import express from "express";
import path from "path";
import cors, { CorsOptions } from 'cors';
import { route } from "./routes";
import { errorsMiddleware } from "./middleware/errorsMiddleware";

const app = express();

const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions));

//path images
const dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.use(express.json());

app.use('/api/', route);

app.use(errorsMiddleware);

export { app };