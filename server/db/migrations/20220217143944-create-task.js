module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      beginning: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      ending: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      time_spent: {
        type: Sequelize.TIME,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tasks');
  },
};
