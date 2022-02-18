const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Task.init(
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      beginning: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      ending: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      time_spent: {
        type: DataTypes.TIME,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  return Task;
};
