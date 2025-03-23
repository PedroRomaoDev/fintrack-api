import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class OfxTransacao extends Model {}

// ATENÇÃO AOS COMENTÁRIOS
OfxTransacao.init(
    {
        trasacaoofx_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        // Aqui vai ficar o valor despesa ou receita (despesa = 0, receita = 1) preferi usar tinyint em vez de enum
        tipo: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: {
                isIn: [[0, 1]], // Garante que o valor será 0 ou 1
            },
        },

        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        // Data da movimentação (sempre igual ou anterior a data atual - ainda não trabalhamos com previsão)
        data: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Data atual será a data e hora padrão
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // Essa coluna é tipo um status para sabermos se foi uma transação importada do OFX ou criada manualmente
        ofx_imported: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Valor padrão é 'false'
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'OfxTransacao',
        tableName: 'OfxTransacao',
        timestamps: true, //Criar colunas de data de criação a atualização
    },
);

export default OfxTransacao;
