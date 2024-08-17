import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import loggerMiddleware from './middleware/loggerMiddleware';
import router from './router/router';

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(morgan('short'));
app.use(loggerMiddleware);
app.use(router);

app.get("/", (req, res) => {
    res.send("Bem-vindo ao meu site!");
   });

   app.get("/sobre", (req, res) => {
    res.send("Bem-vindo à página sobre!");
});
   
app.use((req, res) => {
    res.statusCode = 404;
    res.send("404!");
});

app.get("/bemvindo/:nome", (req, res) => {
    res.send(`Seja bem vindo ${req.params.nome}`);
});

app.get( /^\/(api|rest)\/.+$/, (req, res) => {
    res.send("Envio de dados da API!");
});
   
   

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
