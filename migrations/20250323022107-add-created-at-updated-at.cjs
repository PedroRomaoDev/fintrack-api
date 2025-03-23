'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona 'createdAt' e 'updatedAt' nas tabelas
    await queryInterface.addColumn('OfxTransacao', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('OfxTransacao', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('User', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('User', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('Transaction', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('Transaction', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverte as alterações, removendo 'createdAt' e 'updatedAt' das tabelas
    await queryInterface.removeColumn('OfxTransacoes', 'createdAt');
    await queryInterface.removeColumn('OfxTransacoes', 'updatedAt');

    await queryInterface.removeColumn('User', 'createdAt');
    await queryInterface.removeColumn('User', 'updatedAt');

    await queryInterface.removeColumn('Transaction', 'createdAt');
    await queryInterface.removeColumn('Transaction', 'updatedAt');
  },
};
