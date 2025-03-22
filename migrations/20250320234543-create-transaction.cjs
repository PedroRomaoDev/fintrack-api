import { v4 as uuidv4 } from 'uuid';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaction", {
      id: {
        type: Sequelize.UUID, // Usamos STRING para armazenar o UUID
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4() // Gera UUID v4
      },
      user_id: {
        type: Sequelize.STRING, // UUID em formato STRING
        allowNull: false,
        references: {
          model: "User", // Nome da tabela de referência
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("EARNING", "EXPENSE", "INVESTMENT"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Transaction");
  },
};
