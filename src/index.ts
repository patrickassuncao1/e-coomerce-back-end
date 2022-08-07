import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.APP_PORT || 5000, () => console.log('Servidor na porta ' + process.env.APP_PORT));