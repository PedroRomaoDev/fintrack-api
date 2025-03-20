/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Carrega as variáveis do .env

const sequelize = new Sequelize(
    process.env.POSTGRES_DB, // Nome do banco
    process.env.POSTGRES_USER, // Usuário do banco
    process.env.POSTGRES_PASSWORD, // Senha do banco
    {
        host: process.env.POSTGRES_HOST, // Host do banco
        port: process.env.POSTGRES_PORT, // Porta do banco
        dialect: 'postgres', // Usando PostgreSQL
        logging: false, // Opcional: desativar logs do Sequelize
    },
);

export default sequelize;
