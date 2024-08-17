import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import loggerMiddleware from './loggerMiddleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(morgan('short'));
app.use(loggerMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
