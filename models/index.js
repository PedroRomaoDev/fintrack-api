import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import databaseConfig from '../config/database.js';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

const sequelize = new Sequelize(config);

const db = {};

const modelFiles = fs
    .readdirSync(__dirname)
    .filter((file) => file !== 'index.js' && file.endsWith('.js'));

const loadModels = async () => {
    for (const file of modelFiles) {
        const { default: modelImport } = await import(
            path.join(__dirname, file)
        );
        const model = modelImport(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    }

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
};

await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
