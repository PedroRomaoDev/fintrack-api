import sequelize from '../db.js';
import User from './User.js';
import Transaction from './Transaction.js';

const models = { User, Transaction };

export { sequelize, User, Transaction };
export default models;
