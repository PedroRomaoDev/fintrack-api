import { Sequelize } from 'sequelize';
import 'dotenv/config';
import process from 'process';

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
        logging: false, // Desativa logs SQL no console
    },
);

export default sequelize;
