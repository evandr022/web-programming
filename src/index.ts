import express from 'express';
import session from 'express-session';
import router from './router/routes';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import loggerMiddleware from './middleware/loggerMiddleware';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializar o Prisma Client
const prisma = new PrismaClient();

// Inicializar o aplicativo Express
const app = express();

// Método middleware():
app.use(cookieParser())

// Configurar a view engine Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analisar o corpo das requisições
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para logs
app.use(loggerMiddleware);

// Configuração da sessão
//app.use(session({
//  genid: () => require('crypto').randomBytes(16).toString('hex'),
//  secret: process.env.SESSION_SECRET || 'default_secret', // Utilize uma variável de ambiente para o segredo da sessão
//  resave: false,
//  saveUninitialized: true,
//  cookie: { secure: false } // Defina como true se estiver usando HTTPS
//}));

app.use(session({
    genid: () => uuidv4(), // usamos UUID para gerar os SESSID
    secret: 'Hi9Cf#mK98',
    resave: true,
    saveUninitialized: true,
   }));
   

// Configurar as rotas da aplicação
app.use(router);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Definir a porta do servidor
const PORT = process.env.PORT || 3333;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
