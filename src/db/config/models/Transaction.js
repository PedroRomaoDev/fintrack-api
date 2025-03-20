import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

class Transaction extends Model {}

Transaction.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('EARNING', 'EXPENSE', 'INVESTMENT'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
    },
);

//Definir relacionamento entre User e Transaction
User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Transaction;
