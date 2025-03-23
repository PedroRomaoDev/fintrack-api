const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OfxTransacao', {
            trasacaoofx_id: {
                type: Sequelize.UUID, // Usamos STRING para armazenar o UUID
                primaryKey: true,
                allowNull: false,
                defaultValue: uuidv4(), // Gera UUID v4
            },
            user_id: {
                type: Sequelize.UUID, // UUID em formato STRING
                allowNull: false,
                references: {
                    model: 'User', // A tabela 'User' precisa existir
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            tipo: {
                type: Sequelize.SMALLINT, // Usando SMALLINT em vez de TINYINT
                allowNull: false,
                validate: {
                    isIn: [[0, 1]], // Garante que o valor será 0 ou 1
                },
            },

            valor: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            data: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Data atual será a data e hora padrão
            },

            descricao: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            ofx_imported: {
                type: Sequelize.BOOLEAN,
                defaultValue: false, // Valor padrão é 'false'
                allowNull: false,
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,  // Define o valor padrão para createdAt
              },
              updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,  // Define o valor padrão para updatedAt
              },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('OfxTransacao');
    },
};
