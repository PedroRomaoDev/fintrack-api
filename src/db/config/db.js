import { Sequelize } from 'sequelize';
import databaseConfig from './database.js';

const sequelize = new Sequelize(databaseConfig.development);

export default sequelize;
