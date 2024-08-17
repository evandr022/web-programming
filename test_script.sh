#!/bin/bash

DIR="ExpTS_Avancada"
DB="game"
USER="game"
PASS="1234"
PORT="3333"
ROUNDS="10"
LOG_DIR="./logs"
LOG_FORMAT="complete" # ou "simple"

cd $DIR
npm install

echo "PORT=$PORT" > .env
echo "ROUNDS=$ROUNDS" >> .env
echo "DATABASE_URL=mysql://$USER:$PASS@localhost:3306/$DB" >> .env
echo "JWT_SECRET=seu_segredo_aleatorio_aqui" >> .env
echo "LOG_DIR=$LOG_DIR" >> .env
echo "LOG_FORMAT=$LOG_FORMAT" >> .env

mysql -u$USER -p$PASS -e "DROP DATABASE IF EXISTS $DB;"
mysql -u$USER -p$PASS -e "CREATE DATABASE $DB;"

npx prisma migrate dev
npm start
