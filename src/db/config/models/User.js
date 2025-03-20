import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'User', // Mantém o nome correto da tabela
    },
);

export default User;
