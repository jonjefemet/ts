import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userService from "./services/userService"
import cors from "cors";
import errorHandler from './src/middleware/handleError';
import { CustomError } from "./src/erros/CustomError";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use(userService);

app.use((req: Request, res: Response) => {
    throw new CustomError("you're lost?", 404, "Not Found");
});

app.use(errorHandler);



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});